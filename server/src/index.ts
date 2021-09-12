import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { logger } from "./middlewares/logger.ts";
import { timing } from "./middlewares/timing.ts";
import { router } from "./routes.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { CORS_ALLOWED_ORIGINS } from "./config/env.ts";

const app = new Application();

// CORS
app.use(oakCors({
  origin: CORS_ALLOWED_ORIGINS.split(","),
  methods: ["GET", "POST"],
}));

// apply middlewares
app.use(logger);
app.use(timing);

// apply routes
app.use(router.routes());
app.use(router.allowedMethods());

// listen
app.listen({ port: 8000 });
