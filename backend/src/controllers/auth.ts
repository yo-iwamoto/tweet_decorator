import { RouterMiddleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { RequestService } from "../services/request.ts";
import { HandleCallbackService } from "../services/handleCallback.ts";
import { SignoutService } from "../services/signout.ts";
import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { HTTPError, ky } from "../plugins/ky.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";

/**
 * return the authenticationURL for OAuth sigining
 */
const request: RouterMiddleware = async (ctx) => {
  const authenticationURL = await new RequestService().execute();

  ctx.response.body = { authenticationURL };
};

const handleCallback: RouterMiddleware = async (ctx) => {
  const token = ctx.request.url.searchParams.get("oauth_token");
  const verifier = ctx.request.url.searchParams.get("oauth_verifier");

  if (!token || !verifier) {
    ctx.response.status = 400;
    ctx.response.body = { message: "invalid request" };
    return;
  }

  const { accessToken, accessTokenSecret } = await new HandleCallbackService({
    token,
    verifier,
  }).execute();

  // ctx.cookies.set("access_token", accessToken);
  // ctx.cookies.set("access_token_secret", accessTokenSecret);

  ctx.response.body = { message: "signed in" };
};

const signout: RouterMiddleware = async (ctx) => {
  // new SignoutService({
  //   token: await ctx.cookies.get("access_token"),
  // }).execute();

  // ctx.cookies.delete("access_token");
  // ctx.cookies.delete("access_token_secret");

  // ctx.response.body = { message: "signed out" };
};

const retrieve: RouterMiddleware = async (ctx) => {
  // const authorizedHeader = buildOAuthHeader({
  //   url: "https://api.twitter.com/1.1/account/verify_credentials.json",
  //   method: "GET",
  //   token: await ctx.cookies.get("access_token") ?? "",
  //   tokenSecret: await ctx.cookies.get("access_token_secret") ?? "",
  // });

  // const res = await ky.get("1.1/account/verify_credentials.json", {
  //   headers: { Authorization: authorizedHeader },
  // }).then((res) => res.json()).catch((err) => {
  //   if (err instanceof HTTPError) {
  //     handleHttpError(err);
  //   }
  // });

  // ctx.response.body = { res };
};

export { handleCallback, request, retrieve, signout };
