import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { authRouter } from "./controllers/auth.ts";

const router = new Router();

router
  .get("/auth", authRouter.routes(), authRouter.allowedMethods());

export { router };
