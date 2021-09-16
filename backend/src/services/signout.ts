import { TWITTER_API_ACCESS_TOKEN_SECRET } from "../config/env.ts";
import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";
import { HTTPError, ky } from "../plugins/ky.ts";
import { log } from "../plugins/tl_log.ts";

type Arg = {
  token: string | undefined;
};

const headerParameters = {
  url: "https://api.twitter.com/1.1/oauth/invalidate_token",
  method: "POST",
  tokenSecret: TWITTER_API_ACCESS_TOKEN_SECRET,
} as const;

export class SignoutService {
  private _token: string | undefined;

  constructor(arg: Arg) {
    this._token = arg.token;
  }

  execute = async () => {
    if (!this._token) return;

    const header = buildOAuthHeader({
      ...headerParameters,
      token: this._token,
    });

    await ky.post("1.1/oauth/invalidate_token", {
      headers: { Authorization: header },
    })
      .catch((err) => {
        if (err instanceof HTTPError) {
          handleHttpError(err);
        } else {
          log.error(err);
        }
      });
  };
}
