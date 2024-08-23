import { createClient, SupabaseClient } from "@supabase/supabase-js";

class SupabaseSingleton {
  private static instance: SupabaseClient | null = null;

  private constructor() {}

  public static getInstance(): SupabaseClient {
    if (!SupabaseSingleton.instance) {
      SupabaseSingleton.instance = createClient(
        import.meta.env.VITE_SUPABASE_URL as string,
        import.meta.env.VITE_SUPABASE_ANON_KEY as string
      );
    }

    return SupabaseSingleton.instance;
  }
}

export const supabase = SupabaseSingleton.getInstance();
