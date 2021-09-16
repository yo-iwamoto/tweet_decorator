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
export const DB_USER = Deno.env.get("DB_USER") as string;
export const DB_HOST = Deno.env.get("DB_HOST") as string;
export const DB_PASS = Deno.env.get("DB_PASS") as string;
export const DB_NAME = Deno.env.get("DB_NAME") as string;
