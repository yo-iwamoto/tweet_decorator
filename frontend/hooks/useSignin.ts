import { redirect } from "aleph/web";

export const useSignin = (): () => Promise<void> => {
  const signin = async () => {
    const res = await fetch("https://tweet-decorator.deno.dev/auth/signin")
      .then((res) => res.json())
      .catch(console.error);
    redirect(res.authenticationURL);
  };
  return signin;
};
