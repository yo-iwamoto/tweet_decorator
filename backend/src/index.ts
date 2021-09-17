import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { logger } from "./middlewares/logger.ts";
import { timing } from "./middlewares/timing.ts";
import { cors } from "./middlewares/cors.ts";
import { router } from "./routes.ts";
import { authVerifier } from "./middlewares/authVerifier.ts";
import { session } from "./plugins/oak_sessions.ts";

new Application()
  .use(cors, authVerifier, session.initMiddleware(), logger, timing) // middlewares
  .use(router.routes(), router.allowedMethods()) //routes
  .listen({ port: 8000 }); // serve
