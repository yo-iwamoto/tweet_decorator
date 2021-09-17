import { Middleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";

export const authVerifier: Middleware = async (_, next) => {
  // TODO: verify cookie and set user data
  await next();
};
