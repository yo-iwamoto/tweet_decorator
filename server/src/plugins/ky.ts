import kyModule from "https://cdn.skypack.dev/ky@0.28.5?dts";
import { TWITTER_API_TOKEN } from "../config/env.ts";

export const ky = kyModule.create({
  headers: {
    Authorization: `Bearer ${TWITTER_API_TOKEN}`,
  },
});
