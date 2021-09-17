import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import * as auth from "./controllers/auth.ts";
import * as hashtags from "./controllers/hashtags.ts";
import * as users from "./controllers/users.ts";
import { healthCheck } from "./controllers/healthcheck.ts";

const router = new Router();

const authRouter = new Router()
  .get("/", auth.validate)
  .get("/request", auth.request)
  .get("/callback", auth.handleCallback)
  .get("/signout", auth.signout);

const usersRouter = new Router()
  .get("/", users.retrieve);

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
    "/users",
    usersRouter.routes(),
    usersRouter.allowedMethods(),
  )
  .use(
    "/hashtags",
    hashtagsRouter.routes(),
    hashtagsRouter.allowedMethods(),
  )
  .get("/health_check", healthCheck);

export { router };
