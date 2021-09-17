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

type Return = {
  oauthToken: string;
  oauthTokenSecret: string;
};

export class RequestService {
  execute = async (): Promise<Return> => {
    const header = buildOAuthHeader(headerParameters);

    const res = await ky.post("oauth/request_token", {
      headers: { Authorization: header },
    })
      .then(async (res) => res.text())
      .catch((err) => {
        if (err instanceof HTTPError) {
          handleHttpError(err);
        } else {
          log.error(err);
        }
      });

    if (!res) throw new Error();

    const text = res.split("&");
    const [oauthToken, oauthTokenSecret] = text.map((t) => t.split("=")[1]);

    return { oauthToken, oauthTokenSecret };
  };
}
