import { redirect } from "aleph/web";

export const useSignin = (): () => Promise<void> => {
  const signin = async () => {
    const res = await fetch("https://tweet-decorator.deno.dev")
      .then((res) => res.json())
      .catch(console.error);
    redirect(res.data.authenticationURL);
  };
  return signin;
};
