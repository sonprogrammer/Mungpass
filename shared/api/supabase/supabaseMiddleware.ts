import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export function createClient(req: NextRequest) {
    let res = NextResponse.next({
        request: {
            headers: req.headers
        }
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        req.cookies.set(name, value);
                        res.cookies.set(name, value, {
                            ...options, path: '/',
                            httpOnly: true,
                            secure: true, // 배포(HTTPS) 시 필수
                            sameSite: 'lax',
                        });
                    });
                },
                // setAll(cookiesToSet){
                //     cookiesToSet.forEach(({name, value}) => {
                //         req.cookies.set(name, value)
                //     })

                //     res = NextResponse.next({
                //         request: {headers: req.headers}
                //     })

                //     cookiesToSet.forEach(({name, value, options})=>{
                //         res.cookies.set(name, value, {
                //             ...options,
                //             path: '/'
                //         })
                //     })
                // }
            }
        }
    )
    return { supabase, res }
}