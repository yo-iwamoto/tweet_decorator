import { TwitterApiv2 } from "https://esm.sh/twitter-api-v2";

const TOKEN = Deno.env.get("TWITTER_API_TOKEN") as string;

export const twitterClient = new TwitterApiv2(TOKEN);
