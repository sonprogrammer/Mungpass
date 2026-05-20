'use server'

import { supabaseServer } from "@/shared/api/supabase/server"
import { revalidatePath } from "next/cache"

export async function cookieLogout() {
    const supabase = await supabaseServer()

    await supabase.auth.signOut()


    revalidatePath('/', 'layout')
}