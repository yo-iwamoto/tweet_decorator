import { Middleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { log } from "../plugins/tl_log.ts";

export const logger: Middleware = async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  log.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
};
