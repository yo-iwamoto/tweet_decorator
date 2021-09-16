import { Client } from "https://deno.land/x/postgres@v0.12.0/mod.ts";
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from "../config/env.ts";

const db = new Client({
  user: DB_USER,
  database: DB_NAME,
  hostname: DB_HOST,
  password: DB_PASS,
  port: 5432,
});

await db.connect();

export { db };
