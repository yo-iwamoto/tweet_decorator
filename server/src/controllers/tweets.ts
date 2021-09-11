import {
  Router,
  RouterMiddleware,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { twitterApi } from "../services/twitter.ts";

const getTweet: RouterMiddleware = async (ctx) => {
  const id = ctx.params.id as string;
  const tweet = await twitterApi.getTweet(id);
  ctx.response.body = { tweet };
};

const destroyTweet: RouterMiddleware = async (ctx) => {
  const id = ctx.params.id as string;
  const res = await twitterApi.destroyTweet(id);
  ctx.response.body = { res };
};

const tweetsRouter = new Router();
tweetsRouter
  .get("/:id", getTweet)
  .delete("/:id", destroyTweet);

export { tweetsRouter };
