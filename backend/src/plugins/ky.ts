import kyModule, { HTTPError } from "https://esm.sh/ky@0.28.5";

export { HTTPError };

export const ky = kyModule.create({
  prefixUrl: "https://api.twitter.com",
});
