import { usersApi } from "../data_access/users.ts";
import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";
import { HTTPError, ky } from "../plugins/ky.ts";
import { log } from "../plugins/tl_log.ts";

type Arg = {
  token: string | null;
  verifier: string | null;
  oauthTokenSecret: string | undefined;
};

type Return = {
  accessToken: string;
  accessTokenSecret: string;
  userId: string;
};

export class HandleCallbackService {
  execute = async (arg: Arg): Promise<Return> => {
    const header = buildOAuthHeader({
      url: "https://api.twitter.com/oauth/access_token",
      method: "POST",
      token: arg.token ?? "",
      tokenSecret: arg.oauthTokenSecret ?? "",
      verifier: arg.verifier ?? "",
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
    const [accessToken, accessTokenSecret] = text.map((t) => t.split("=")[1]);

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

    let user = await usersApi.findByTwitterUserId(credential.id_str);
    if (!user) {
      user = await usersApi.create(credential);
    }

    return { accessToken, accessTokenSecret, userId: user.id };
  };
}
