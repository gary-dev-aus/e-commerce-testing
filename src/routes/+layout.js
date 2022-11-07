import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export async function load(event) {
  const { session } = await getSupabase(event);
  return { session };
}
