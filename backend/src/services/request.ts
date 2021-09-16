import {
  TWITTER_API_ACCESS_TOKEN,
  TWITTER_API_ACCESS_TOKEN_SECRET,
} from "../config/env.ts";
import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";
import { HTTPError, ky } from "../plugins/ky.ts";
import { log } from "../plugins/tl_log.ts";

const headerParameters = {
  url: "https://api.twitter.com/oauth/request_token",
  method: "POST",
  token: TWITTER_API_ACCESS_TOKEN,
  tokenSecret: TWITTER_API_ACCESS_TOKEN_SECRET,
} as const;

export class RequestService {
  execute = async (): Promise<string> => {
    const header = buildOAuthHeader(headerParameters);

    const oauthToken = await ky.post("oauth/request_token", {
      headers: { Authorization: header },
    })
      .then(async (res) => {
        return (await res.text()).split("&")[0].split("=")[1];
      })
      .catch((err) => {
        if (err instanceof HTTPError) {
          handleHttpError(err);
        } else {
          log.error(err);
        }
      });

    const authorizeURL =
      `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`;
    return authorizeURL;
  };
}
