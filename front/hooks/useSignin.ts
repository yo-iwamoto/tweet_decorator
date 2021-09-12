import { redirect } from "aleph/web";

export const useSignin = (): () => Promise<void> => {
  const signin = async () => {
    // const res = await axiod.get("auth/signin");
    const res = await fetch("https://tweet-decorator/auth/signin")
      .then((res) => res.json())
      .catch(console.error);
    redirect(res.authenticationURL);
  };
  return signin;
};
