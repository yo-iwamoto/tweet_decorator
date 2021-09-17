export const TWITTER_API_CONSUMER_KEY = Deno.env.get(
  "TWITTER_API_CONSUMER_KEY",
) as string;
export const TWITTER_API_CONSUMER_KEY_SECRET = Deno.env.get(
  "TWITTER_API_CONSUMER_KEY_SECRET",
) as string;
export const TWITTER_API_ACCESS_TOKEN = Deno.env.get(
  "TWITTER_API_ACCESS_TOKEN",
) as string;
export const TWITTER_API_ACCESS_TOKEN_SECRET = Deno.env.get(
  "TWITTER_API_ACCESS_TOKEN_SECRET",
) as string;
export const CORS_ALLOWED_ORIGINS = Deno.env.get(
  "CORS_ALLOWED_ORIGINS",
) as string;
export const SUPABASE_SECRET_KEY = Deno.env.get(
  "SUPABASE_SECRET_KEY",
) as string;
export const COOKIE_STORE_KEY = Deno.env.get("COOKIE_STORE_KEY") as string;
