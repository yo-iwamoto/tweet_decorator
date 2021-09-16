import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import * as auth from "./controllers/auth.ts";
import * as hashtags from "./controllers/hashtags.ts";
import { healthCheck } from "./controllers/healthcheck.ts";

const router = new Router();

const authRouter = new Router()
  .get("/signin", auth.signin)
  .get("/callback", auth.handleCallback);

const hashtagsRouter = new Router()
  .get("/", hashtags.hashtagsIndex)
  .post("/", hashtags.registerHashtag)
  .patch("/:id", hashtags.updateHashtag)
  .delete("/:id", hashtags.deleteHashtag);

router
  .use(
    "/auth",
    authRouter.routes(),
    authRouter.allowedMethods(),
  )
  .use(
    "/hashtags",
    hashtagsRouter.routes(),
    hashtagsRouter.allowedMethods(),
  )
  .get("/health_check", healthCheck);

export { router };
