import { createClient } from "@/shared/api/supabase/supabaseMiddleware";
import { NextRequest } from "next/server";

export default async function proxy(req: NextRequest){
    const {supabase, res} = createClient(req)

    const { data: {user}} = await supabase.auth.getUser()

    console.log('proxy uuuser', user)
    
    const url = req.nextUrl.clone()


    // *로그인 된상태에서 랜딩페이지/회원가입에 접속 시
    if(user && url.pathname === '/' || url.pathname ==='signup'){
        const restrictedPaths = ['/', '/signup']
        const isRestricted = restrictedPaths.includes(url.pathname)

        const isOwnerSignupStep = url.pathname.startsWith('/signup/owner')

        if(isRestricted && ! isOwnerSignupStep){
            url.pathname = '/home'
            return Response.redirect(url)
        }
    }

    //* 로그인 안된상태에서 다른 페이지 이동할시, 랜딩페이지로 이동
    const publicPath = ['/', '/signup', '/signup/user', '/signup/owner', '/signup/owner/store', '/signup/owner/auth', '/signup/owner/complete']

    const isPublic = publicPath.includes(url.pathname)

    if(!user && !isPublic){
        url.pathname = '/'
        return Response.redirect(url)
    }

    //*관리자 로그인
    if(user && url.pathname.startsWith('/admin')){
        const { data: profile} = await supabase.from('profiles').select('role').eq('id', user.id).single()
        console.log('proxy user', profile)

        if(profile?.role !== 'admin'){
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
