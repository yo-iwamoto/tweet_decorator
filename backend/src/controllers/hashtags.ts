import { RouterMiddleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";

const registerHashtag: RouterMiddleware = (ctx) => {
  ctx.response.body = "register new hashtags by request body";
};

const hashtagsIndex: RouterMiddleware = (ctx) => {
  ctx.response.body = "returns a list of registered hashtags";
};

const updateHashtag: RouterMiddleware = (ctx) => {
  const id = ctx.params.id as string;
  ctx.response.body = `update hashtag with id ${id}`;
};

const deleteHashtag: RouterMiddleware = (ctx) => {
  const id = ctx.params.id as string;
  ctx.response.body = `unregister hashtag with id ${id}`;
};

export { deleteHashtag, hashtagsIndex, registerHashtag, updateHashtag };
