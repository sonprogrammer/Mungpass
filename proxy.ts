
import { createClient } from "@/shared/api/supabase/supabaseMiddleware";
import { NextRequest, NextResponse } from "next/server";


export default async function proxy(req: NextRequest) {
    const { supabase, res } = createClient(req)
    const {data: {user}} = await supabase.auth.getUser()

    const url = req.nextUrl
    const shopId = url.searchParams.get('shopId')
    const productId = url.searchParams.get('productId')
    
    const isCheckInEntry = url.pathname === '/home'  && url.searchParams.get('modal') === 'checkin' && Boolean(shopId && productId)


    if(!user && isCheckInEntry){
        const loginUrl = new URL('/', req.url)
        loginUrl.searchParams.set('next', `${url.pathname}${url.search}`)
        const redirectRes = NextResponse.redirect(loginUrl)
        res.cookies.getAll().forEach(cookie => {
            redirectRes.cookies.set(cookie)
        })
        return redirectRes
    }

    return res
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}
