import { axiod } from "~/plugins/axiod.ts";
import { redirect } from "aleph/web";

export const useSignin = (): () => Promise<void> => {
  const signin = async () => {
    const res = await axiod.get("auth/signin");
    redirect(res.data.authenticationURL);
  };
  return signin;
};
