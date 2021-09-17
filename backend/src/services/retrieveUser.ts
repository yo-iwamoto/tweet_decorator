import { buildOAuthHeader } from "../lib/buildOAuthHeader.ts";
import { handleHttpError } from "../lib/handleHttpError.ts";
import { HTTPError, ky } from "../plugins/ky.ts";
import { TwitterUserCredential } from "../types/twitter.ts";

type Arg = {
  token: string;
  tokenSecret: string;
};

export class RetrieveUserService {
  execute = async (arg: Arg): Promise<TwitterUserCredential> => {
    const header = buildOAuthHeader({
      url: "https://api.twitter.com/1.1/account/verify_credentials.json",
      method: "GET",
      token: arg.token ?? "",
      tokenSecret: arg.tokenSecret ?? "",
    });

    const res = await ky.get("1.1/account/verify_credentials.json", {
      headers: { Authorization: header },
    }).then((res) => res.json()).catch((err) => {
      if (err instanceof HTTPError) {
        handleHttpError(err);
      }
    });

    return res as TwitterUserCredential;
  };
}
