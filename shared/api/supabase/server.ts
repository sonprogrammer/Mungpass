import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
const isProduction = process.env.NODE_ENV === 'production';

export async function supabaseServer() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookieToSet){
                    try {
                        cookieToSet.forEach(({name, value, options}) => 
                            cookieStore.set(name, value, {
                                ...options,
                                path: '/',
                                httpOnly: true,
                                secure: isProduction,
                                sameSite: 'lax'
                            }))
                    } catch {
                        console.error('cookie error')
                    }
                }
            }
        }
    )
}