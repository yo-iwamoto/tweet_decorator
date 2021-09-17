import { createClient } from "https://deno.land/x/supabase@1.1.0/mod.ts";
import { SUPABASE_SECRET_KEY } from "../config/env.ts";

const PUBLIC_SUPABASE_URL = "https://mirsrasatekcbsmbzxpo.supabase.co";

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  SUPABASE_SECRET_KEY,
);
