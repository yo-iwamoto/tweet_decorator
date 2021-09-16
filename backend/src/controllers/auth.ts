import { RouterMiddleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { SigninService } from "../services/signin.ts";
import { HandleCallbackService } from "../services/handleCallback.ts";

/**
 * return the authenticationURL for OAuth sigining
 */
const signin: RouterMiddleware = async (ctx) => {
  const authenticationURL = await new SigninService().execute();

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

  const cred = await new HandleCallbackService({ token, verifier }).execute();
  ctx.response.body = {
    name: cred.name,
    screen_name: cred.screen_name,
    profile_image_url_https: cred.profile_image_url_https,
  };
};

export { handleCallback, signin };
