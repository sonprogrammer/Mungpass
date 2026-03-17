import { createClient } from "@/shared/api/supabase/supabaseMiddleware";
import { NextRequest } from "next/server";

export default async function proxy(req: NextRequest){
    const {supabase, res} = createClient(req)

    const { data: {user}} = await supabase.auth.getUser()
    
    const url = req.nextUrl.clone()

    const role = user?.app_metadata?.role
    // console.log('user', user?.app_metadata?.role)

    // *로그인 된상태에서 랜딩페이지/회원가입에 접속 시
    if(user && (url.pathname === '/' || url.pathname ==='signup')){

        const isOwnerSignupStep = url.pathname.startsWith('/signup/owner')

        if(!isOwnerSignupStep){
            // *관리자라면 관리자 페이지로 아니면 일반 홈으로
            if(role === 'admin'){
                url.pathname = '/admin'
            }else{
                url.pathname = '/home'
            }
            return Response.redirect(url)
        }
    }

    if (user && role === 'admin' && url.pathname.startsWith('/home')) {
        url.pathname = '/admin';
        return Response.redirect(url);
    }

    //* 로그인 안된상태에서 다른 페이지 이동할시, 랜딩페이지로 이동
    const publicPath = ['/', '/signup', '/signup/user', '/signup/owner', '/signup/owner/store', '/signup/owner/auth', '/signup/owner/complete']

    const isPublic = publicPath.includes(url.pathname)

    if(!user && !isPublic){
        url.pathname = '/'
        return Response.redirect(url)
    }

    //*관리자 로그인 접근 권한 확인
    if(url.pathname.startsWith('/admin')){
        if(!user || role !== 'admin'){
            url.pathname = '/'
            return Response.redirect(url)
        }
    }
    
    return res
}

export const config ={
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}
