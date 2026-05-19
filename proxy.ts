import { createClient } from "@/shared/api/supabase/supabaseMiddleware";
import { redirectWithCookies } from "@/shared/lib/auth/redirectWithCookies";
import { NextRequest } from "next/server";


export default async function proxy(req: NextRequest) {
    // const { supabase, res } = createClient(req)
    const { res } = createClient(req)

    // const { data: { user } } = await supabase.auth.getUser()

    const url = req.nextUrl.clone()

    // const { data: profile} = await supabase.from('profiles').select('role').eq('id', user?.id).single()
    // const role = profile?.role

    const regularUserPage = ['/home', '/around', '/history', '/my-pets', '/save', 'mypage']
    // TODO더생기면 추가
    const ownerPage = ['/owner', '/kiosk']
    // TODO더생기면 추가
    const adminPage = ['/admin']


    //* 로그인 안된상태에서 다른 페이지 이동할시, 랜딩페이지로 이동
    const publicPath = ['/', '/signup', '/signup/user', '/signup/owner', '/signup/owner/store', '/signup/owner/auth', '/signup/owner/complete']

    const isPublic = publicPath.includes(url.pathname)

    // * 카카오 콜백 함수는 걍 통과
    if (url.pathname.startsWith('/api/auth')) {
        return res
    }



    // if (!user && !isPublic) {
    //     url.pathname = '/'
    //     return redirectWithCookies(url, res)
    // }

    // * 검사안하는곳
    // if (!isPublic) {
    //     url.pathname = '/'
    //     return redirectWithCookies(url, res)
    // }


    // * 카카오로 회원가입시 처음에는 role이 없으니깐 
    // if (user && !role) {
    //     return res
    // }

    // *로그인 된상태에서 랜딩페이지/회원가입에 접속 시
    // if (user && (url.pathname === '/' || url.pathname === 'signup')) {

    //     const isOwnerSignupStep = url.pathname.startsWith('/signup/owner')

    //     if (!isOwnerSignupStep) {
    //         // *관리자라면 관리자 페이지로 아니면 일반 홈으로
    //         if (role === 'admin') {
    //             url.pathname = '/admin'
    //         } else if (role === 'owner') {
    //             url.pathname = '/owner'
    //         } else {
    //             url.pathname = '/home'
    //         }
    //         return redirectWithCookies(url, res) 
    //     }
    // }

    // // *사장 로그인 접근 권환 환익
    // if (user && role === 'owner') {
    //     const isOwnerSignupStep = url.pathname.startsWith('/signup/owner')

    //     if (!isOwnerSignupStep && (url.pathname.startsWith('/home') || url.pathname.startsWith('/admin'))) {
    //         url.pathname = '/owner'
    //         return redirectWithCookies(url, res)
    //     }
    // }

    // // * 일반 유저 사장, 관리자 페이지 못가게 
    // if (user && role === 'user') {
    //     if (url.pathname.startsWith('/owner') || url.pathname.startsWith('/admin')) {
    //         url.pathname = '/home'
    //         return redirectWithCookies(url, res)
    //     }
    // }


    // //*관리자 로그인 접근 권한 확인, 관리자가 일반 유저나 사장 유저페이지로 이동못하게
    // if (user && role === 'admin') {
    //     if (url.pathname.startsWith('/home') || url.pathname.startsWith('/owner')) {
    //         url.pathname = '/admin'
    //         return redirectWithCookies(url, res)
    //     }
    // }

    // // *url직접 했을때
    // if (url.pathname.startsWith('/admin') && role !== 'admin') {
    //     url.pathname = '/'
    //     return redirectWithCookies(url, res)
    // }
    // if (url.pathname.startsWith('/owner') && role !== 'owner') {
    //     url.pathname = '/'
    //     return redirectWithCookies(url, res)
    // }

    return res
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|ico|svg)$).*)',
    ]
}
