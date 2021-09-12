import {
  Router,
  RouterMiddleware,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import {
  TWITTER_API_ACCESS_TOKEN,
  TWITTER_API_ACCESS_TOKEN_SECRET,
} from "../config/env.ts";
import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";
import { HTTPError, ky } from "../plugins/ky.ts";

/**
 * return the authenticationURL for OAuth sigining
 */
const navigateSignin: RouterMiddleware = async (ctx) => {
  const header = buildOAuthHeader({
    url: "https://api.twitter.com/oauth/request_token",
    method: "GET",
    token: TWITTER_API_ACCESS_TOKEN,
    tokenSecret: TWITTER_API_ACCESS_TOKEN_SECRET,
  });

  const oauthToken = await ky.get("oauth/request_token", {
    headers: {
      Authorization: header,
    },
  }).then(async (res) => {
    return (await res.text()).split("&")[0].split("=")[1];
  }).catch((err) => {
    if (err instanceof HTTPError) handleHttpError(err);
  });

  ctx.response.body = {
    authenticationURL:
      `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`,
  };
};

const handleOauth: RouterMiddleware = async (_) => {};

const authRouter = new Router();
authRouter
  .get("/signin", navigateSignin)
  .get("/callback", handleOauth);

export { authRouter };
