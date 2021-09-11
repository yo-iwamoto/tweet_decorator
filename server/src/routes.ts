import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Hello, Deno!";
  });

export { router };
