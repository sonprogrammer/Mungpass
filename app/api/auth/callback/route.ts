import { supabaseServer } from "@/shared/api/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams, origin } = new URL(req.url)
    const code = searchParams.get('code')

    const next = searchParams.get('next')
    let destination = new URL('/', origin)

    if (next) {
        const target = new URL(next, origin)
        if (target.origin === origin && target.pathname === '/home') {
            destination = target
        }
    }

    if (code) {
        const res = NextResponse.redirect(`${origin}${next}`)
        const supabase = await supabaseServer()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return res
        }

        console.error('exchange error', error.message)
    }

    const loginUrl = new URL('/', origin)
    loginUrl.searchParams.set('error', 'auth_code_error')
    if (destination.pathname === '/home') {
        loginUrl.searchParams.set('next', `${destination.pathname}${destination.search}`)
    }
    return NextResponse.redirect(loginUrl)
}