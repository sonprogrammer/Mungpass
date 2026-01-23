import { createBrowserClient } from '@supabase/ssr'


const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createBrowserClient(url, key, {
  auth: {
    persistSession: true, 
    autoRefreshToken: true,  
    detectSessionInUrl: true, 
  }
});

export const supabaseClient = () => {
  if (!url || !key) {
    throw new Error("Supabase URL 또는 Key 확인");
  }
  return supabase;
};