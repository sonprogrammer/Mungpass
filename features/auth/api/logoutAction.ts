'use server'

import { supabaseServer } from "@/shared/api/supabase/server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function cookieLogout() {
    const supabase = await supabaseServer()

    await supabase.auth.signOut()

    const cookieStore = await cookies()
    
    cookieStore.getAll().forEach((cookie) => {
        if (cookie.name.startsWith('sb-')) {
            cookieStore.set(cookie.name, '', {
                maxAge: 0,
                path: '/',
            })
        }
    })

    revalidatePath('/', 'layout')
    redirect('/')
}