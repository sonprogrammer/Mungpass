
import { createBrowserClient } from '@supabase/ssr'

export const supabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  return createBrowserClient(url, key, {
    auth: {
      persistSession: true, 
      flowType: 'pkce',
      autoRefreshToken: true,  
      detectSessionInUrl: true, 
    },
    realtime: {
      params: {
        eventPerSecond: 10
      }
    }
  });
};