import {
  CookieStore,
  Session,
} from "https://deno.land/x/oak_sessions@v3.1.0/mod.ts";
import { COOKIE_STORE_KEY } from "../config/env.ts";

const store = new CookieStore(COOKIE_STORE_KEY);

export const session = new Session(store);
