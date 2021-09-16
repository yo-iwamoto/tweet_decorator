import { TWITTER_API_ACCESS_TOKEN_SECRET } from "../config/env.ts";
import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";
import { HTTPError, ky } from "../plugins/ky.ts";
import { log } from "../plugins/tl_log.ts";
import type { TwitterUserCredential } from "../types/credential.ts";

type Arg = {
  token: string;
  verifier: string;
};

export class HandleCallbackService {
  private _token: string;
  private _verifier: string;

  constructor(arg: Arg) {
    this._token = arg.token;
    this._verifier = arg.verifier;
  }

  execute = async (): Promise<TwitterUserCredential> => {
    const header = buildOAuthHeader({
      url: "https://api.twitter.com/oauth/access_token",
      method: "POST",
      token: this._token,
      tokenSecret: TWITTER_API_ACCESS_TOKEN_SECRET,
      verifier: this._verifier,
    });

    const res = await ky.post("oauth/access_token", {
      headers: { Authorization: header },
    })
      .then((res) => res.text())
      .catch((err) => {
        if (err instanceof HTTPError) {
          handleHttpError(err);
        } else {
          log.error(err);
        }
      });

    if (typeof res !== "string") throw new Error();

    const text = res.split("&");
    const [accessToken, accessTokenSecret, userId] = text.map((t) =>
      t.split("=")[1]
    );
    log.info(accessToken, accessTokenSecret);

    const authorizedHeader = buildOAuthHeader({
      url: "https://api.twitter.com/1.1/account/verify_credentials.json",
      method: "GET",
      token: accessToken,
      tokenSecret: accessTokenSecret,
    });
    const credential = await ky.get("1.1/account/verify_credentials.json", {
      headers: { Authorization: authorizedHeader },
    })
      .then((res) => res.json())
      .catch((err) => {
        if (err instanceof HTTPError) {
          handleHttpError(err);
        } else {
          log.error(err);
        }
      });
    log.info(credential);

    return credential as TwitterUserCredential;
  };
}
