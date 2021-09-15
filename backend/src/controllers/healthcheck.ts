import { RouterMiddleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";

export const healthCheck: RouterMiddleware = (ctx) => {
  ctx.response.body = { status: "OK" };
};
