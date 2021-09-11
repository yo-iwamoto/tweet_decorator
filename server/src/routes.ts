import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { tweetsRouter } from "./controllers/tweets.ts";

const router = new Router();

router
  .get("/tweets", tweetsRouter.routes(), tweetsRouter.allowedMethods());

export { router };
