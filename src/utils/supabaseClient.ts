import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);
