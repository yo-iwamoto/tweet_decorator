import { RouterMiddleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { RequestService } from "../services/request.ts";
import { HandleCallbackService } from "../services/handleCallback.ts";
import { session } from "../plugins/oak_sessions.ts";
import { usersApi } from "../data_access/users.ts";

const validate: RouterMiddleware = async (ctx) => {
  const userId = await ctx.state.session.get("user_id");
  const user = await usersApi.find(userId);
  ctx.response.body = { user };
};

/**
 * return the authenticationURL for OAuth sigining
 */
const request: RouterMiddleware = async (ctx) => {
  const { oauthToken, oauthTokenSecret } = await new RequestService().execute();
  await ctx.state.session.set("oauth_token_secret", oauthTokenSecret);

  const authenticationURL =
    `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;

  ctx.response.body = { authenticationURL };
};

/**
 * issue new access token and set session
 */
const handleCallback: RouterMiddleware = async (ctx) => {
  const token = ctx.request.url.searchParams.get("oauth_token");
  const verifier = ctx.request.url.searchParams.get("oauth_verifier");

  const oauthTokenSecret = await ctx.state.session.get("oauth_token_secret");

  const { accessToken, accessTokenSecret, userId } =
    await new HandleCallbackService()
      .execute({ token, verifier, oauthTokenSecret });

  await ctx.state.session.set("access_token", accessToken);
  await ctx.state.session.set("access_token_secret", accessTokenSecret);
  await ctx.state.session.set("user_id", userId);

  ctx.response.body = { message: "signed in" };
};

/**
 * invalidate access token and delete session
 */
const signout: RouterMiddleware = async (ctx) => {
  // TODO
  // const token = await ctx.state.session.get("access_token");
  // const tokenSecret = await ctx.state.session.get("access_token_secret");
  // new SignoutService().execute({ token, tokenSecret });

  await session.deleteSession(ctx);

  ctx.response.body = { message: "signed out" };
};

export { handleCallback, request, signout, validate };
