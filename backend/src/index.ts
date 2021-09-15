import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { logger } from "./middlewares/logger.ts";
import { timing } from "./middlewares/timing.ts";
import { cors } from "./middlewares/cors.ts";
import { router } from "./routes.ts";

new Application()
  .use(cors, logger, timing) // middlewares
  .use(router.routes(), router.allowedMethods()) //routes
  .listen({ port: 8000 }); // serve
