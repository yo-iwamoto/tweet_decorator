import { HTTPError } from "../plugins/ky.ts";
import { log } from "../plugins/tl_log.ts";

export const handleHttpError = (err: HTTPError) => {
  log.error(`${err.request.method} ${err.request.url} - ${err.message}`);
  err.response.text().then((text) => log.error(text));
};
