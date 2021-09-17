import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";
import { HTTPError, ky } from "../plugins/ky.ts";
import { log } from "../plugins/tl_log.ts";

type Arg = {
  token: string | undefined;
  tokenSecret: string | undefined;
};

export class SignoutService {
  execute = async (arg: Arg) => {
    const header = buildOAuthHeader({
      url: "https://api.twitter.com/1.1/oauth/invalidate_token",
      method: "POST",
      token: arg.token ?? "",
      tokenSecret: arg.tokenSecret ?? "",
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
