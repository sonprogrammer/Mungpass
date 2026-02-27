import { createClient } from "@/shared/api/supabase/supabaseMiddleware";
import { NextRequest } from "next/server";

export default async function proxy(req: NextRequest){
    const {supabase, res} = createClient(req)

    const { data: {user}} = await supabase.auth.getUser()

    const url = req.nextUrl.clone()


    // *로그인 된상태에서 랜딩페이지/회원가입에 접속 시
    if(user && url.pathname === '/' || url.pathname ==='signup'){
        url.pathname = '/home'
        return Response.redirect(url)
    }

    //* 로그인 안된상태에서 다른 페이지 이동할시, 랜딩페이지로 이동
    const publicPath = ['/', '/signup', '/signup/user', '/signup/owner']

    const isPublic = publicPath.includes(url.pathname)

    if(!user && !isPublic){
        url.pathname = '/'
        return Response.redirect(url)
    }
    return res
}

export const config ={
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}
