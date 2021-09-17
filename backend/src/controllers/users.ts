import { RouterMiddleware } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { RetrieveUserService } from "../services/retrieveUser.ts";

const retrieve: RouterMiddleware = async (ctx) => {
  const token = await ctx.state.session.get("access_token");
  const tokenSecret = await ctx.state.session.get("access_token_secret");

  const user = await new RetrieveUserService().execute({ token, tokenSecret });

  ctx.response.body = { user };
};

export { retrieve };
