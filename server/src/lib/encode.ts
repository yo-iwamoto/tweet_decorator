import { pipe } from "https://deno.land/x/fun@v1.0.0/fns.ts";

export const encodeOAuthUri = (str: string): string =>
  pipe(
    str,
    encodeURIComponent,
    (str) => str.replaceAll("!", "%21"),
    (str) => str.replaceAll("'", "%27"),
    (str) => str.replaceAll("(", "%28"),
    (str) => str.replaceAll(")", "%29"),
    (str) => str.replaceAll("*", "%2A"),
  );
