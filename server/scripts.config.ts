import type { DenonConfig } from "https://deno.land/x/denon@2.4.8/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "src/index.ts",
      desc: "watch file",
      allow: ["net", "env", "read"],
    },
  },
};

export default config;
