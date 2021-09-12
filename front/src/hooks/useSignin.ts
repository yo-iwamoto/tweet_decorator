import { ky } from "~/plugins/ky.ts";
import { redirect } from "aleph/web";

export const useSignin = (): () => Promise<void> => {
  const signin = async () => {
    const res = await ky.get("auth/signin").then((res) => res.json());
    redirect(res.authenticationURL);
  };
  return signin;
};
