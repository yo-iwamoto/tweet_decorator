import kyModule from "https://cdn.skypack.dev/ky@0.28.5?dts";
import "https://deno.land/x/dotenv@v3.0.0/load.ts";

const TWITTER_API_TOKEN = Deno.env.get("TWITTER_API_TOKEN");

export const ky = kyModule.create({
  headers: {
    Authorization: `Bearer ${TWITTER_API_TOKEN}`,
  },
});
