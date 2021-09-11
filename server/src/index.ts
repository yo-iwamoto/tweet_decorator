import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { logger } from "./middlewares/logger.ts";
import { timing } from "./middlewares/timing.ts";
import { router } from "./routes.ts";
import "https://deno.land/x/dotenv@v3.0.0/mod.ts";

const app = new Application();

// apply middlewares
app.use(logger);
app.use(timing);

// apply routes
app.use(router.routes());
app.use(router.allowedMethods());

// listen
app.listen({ port: 8000 });
