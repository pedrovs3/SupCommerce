import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Schema = "public" | string;

class SupabaseSingleton {
  private static instance: SupabaseClient<any, Schema, any> | null = null;

  private constructor() {}

  public static getInstance(): SupabaseClient<any, Schema, any> {
    if (!SupabaseSingleton.instance) {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const supabaseSchema = (import.meta.env.VITE_SUPABASE_SCHEMA ||
        "public") as Schema;

      SupabaseSingleton.instance = createClient(supabaseUrl, supabaseAnonKey, {
        db: {
          schema: supabaseSchema,
        },
      });
    }

    return SupabaseSingleton.instance;
  }
}

export const supabase = SupabaseSingleton.getInstance();
