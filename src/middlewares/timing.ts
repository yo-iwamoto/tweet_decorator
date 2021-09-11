import { Middleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";

export const timing: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
};
