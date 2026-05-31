import { createClient } from "@/shared/api/supabase/supabaseMiddleware";
import { NextRequest } from "next/server";


export default async function proxy(req: NextRequest) {
    const { supabase, res } = createClient(req)

    await supabase.auth.getUser()


    const url = req.nextUrl.clone()


    // * 카카오 콜백 함수는 걍 통과
    if (url.pathname.startsWith('/api/auth')) {
        return res
    }
    return res
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|ico|svg)$).*)',
    ]
}
