import { Router } from "oak";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Hello, Deno!";
  });

export { router };
