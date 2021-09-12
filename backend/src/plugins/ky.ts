import kyModule, { HTTPError } from "https://cdn.skypack.dev/ky@0.28.5?dts";

export { HTTPError };

export const ky = kyModule.create({
  prefixUrl: "https://api.twitter.com",
});
