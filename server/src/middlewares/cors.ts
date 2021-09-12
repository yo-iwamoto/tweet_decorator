import { oakCors } from "https://deno.land/x/cors@v1.2.2/oakCors.ts";
import { CORS_ALLOWED_ORIGINS } from "../config/env.ts";

export const cors = oakCors({
  origin: CORS_ALLOWED_ORIGINS.split(","),
  methods: ["GET", "POST", "PATCH", "DELETE"],
});
