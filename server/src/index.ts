import { Application } from "oak";
import { logger } from "@/middlewares/logger.ts";
import { timing } from "@/middlewares/timing.ts";
import { router } from "@/routes.ts";
import "dotenv";

const app = new Application();

// apply middlewares
app.use(logger);
app.use(timing);

// apply routes
app.use(router.routes());
app.use(router.allowedMethods());

// listen
app.listen({ port: 8000 });
