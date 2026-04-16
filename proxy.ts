import { createClient } from "@/shared/api/supabase/supabaseMiddleware";
import { NextRequest } from "next/server";

export default async function proxy(req: NextRequest){
    const {supabase, res} = createClient(req)

    const { data: {user}} = await supabase.auth.getUser()
    
    const url = req.nextUrl.clone()

    const role = user?.user_metadata?.role

    const regularUserPage = ['/home', '/around','/history','/my-pets', '/save', 'mypage']
    // TODO더생기면 추가
    const ownerPage = ['/owner', '/kiosk']
    // TODO더생기면 추가
    const adminPage = ['/admin']


    //* 로그인 안된상태에서 다른 페이지 이동할시, 랜딩페이지로 이동
    const publicPath = ['/', '/signup', '/signup/user', '/signup/owner', '/signup/owner/store', '/signup/owner/auth', '/signup/owner/complete']

    const isPublic = publicPath.includes(url.pathname)

    if(!user && !isPublic){
        url.pathname = '/'
        return Response.redirect(url)
    }

    // *로그인 된상태에서 랜딩페이지/회원가입에 접속 시
    if(user && (url.pathname === '/' || url.pathname ==='signup')){

        const isOwnerSignupStep = url.pathname.startsWith('/signup/owner')

        if(!isOwnerSignupStep){
            // *관리자라면 관리자 페이지로 아니면 일반 홈으로
            if(role === 'admin'){
                url.pathname = '/admin'
            }else if(role === 'owner'){
                url.pathname = '/owner'
                
            }else{
                url.pathname = '/home'
            }
            return Response.redirect(url)
        }
    }

    // *사장 로그인 접근 권환 환익
    if (user && role === 'owner') {
        const isOwnerSignupStep = url.pathname.startsWith('/signup/owner')
        
        if (!isOwnerSignupStep && (url.pathname.startsWith('/home') || url.pathname.startsWith('/admin'))) {
            url.pathname = '/owner'
            return Response.redirect(url)
        }
    }

    // * 일반 유저 사장, 관리자 페이지 못가게 
    if (user && (role === 'user' || !role)) {
        if (url.pathname.startsWith('/owner') || url.pathname.startsWith('/admin')) {
            url.pathname = '/home'
            return Response.redirect(url)
        }
    }


    //*관리자 로그인 접근 권한 확인, 관리자가 일반 유저나 사장 유저페이지로 이동못하게
    if(user && role === 'admin'){
        if(url.pathname.startsWith('/home')|| url.pathname.startsWith('/owner')){
            url.pathname = '/admin'
            return Response.redirect(url)
        }
    }

    // *url직접 했을때
    if (url.pathname.startsWith('/admin') && role !== 'admin') {
        url.pathname = '/'
        return Response.redirect(url)
    }
    if (url.pathname.startsWith('/owner') && role !== 'owner') {
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
