'use client';

import React, { useCallback, useEffect } from "react";
import { supabaseClient } from "@/shared/api/supabase/client";
import { useShallow } from "zustand/react/shallow";
import { App } from "antd";
import { UserProfile, useUserStore } from "@/entities/user/model";
import { KakaoAddUserInfoModal } from "@/entities/KakaoAuth/ui";
import { cookieLogout } from "@/features/auth/api";
import { getUserFromServer } from "@/entities/user/api";
interface AuthProviderProps {
    children: React.ReactNode,
    initialUser: UserProfile | null
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
    const { setNeedSignup, needSignup, setProfile, logout, loginTabRole, isHydrated, isLoggingIn, setIsLoggingIn } = useUserStore(
        useShallow(state => ({
            setNeedSignup: state.setNeedSignup,
            needSignup: state.needSignup,
            setProfile: state.setProfile,
            logout: state.logout,
            loginTabRole: state.loginTabRole,
            isHydrated: state.isHydrated,
            isLoggingIn: state.isLoggingIn,
            setIsLoggingIn: state.setIsLoggingIn
        })
        ))

    const { message } = App.useApp()

    console.log('initial user from authproficer', initialUser)

    const validateRole = useCallback((profile: UserProfile) => {
        console.log('검증 대상 프로필:', profile);
        console.log('현재 설정된 loginTabRole:', loginTabRole);
        if (!loginTabRole) return true
        if (loginTabRole && profile.role !== 'admin' && profile.role !== loginTabRole) {
            console.error('권한 불일치로 로그아웃 발생!');
            message.error('선택한 회원 유형이 올바르지 않습니다.dfa')
            return false
        }
        return true
    }, [loginTabRole, message])

    const handleLogout = useCallback(async () => {
        await cookieLogout()
        logout()
    }, [logout])

    useEffect(() => {
        if (!isHydrated) return;
        if (initialUser) {
            if (validateRole(initialUser)) {
                setProfile(initialUser)
            } else {
                console.log('firste useeffect')
                handleLogout()
            }
        }
    }, [handleLogout, initialUser, isHydrated, setProfile, validateRole])

    // useEffect(() => {

    //     if (!isHydrated || initialUser) return
    //     const init = async () => {
    //         const supabase = supabaseClient()

    //         const {
    //             data: { user }
    //         } = await supabase.auth.getUser()

    //         if (!user) return

    //         const { data: profile } = await supabase
    //             .from('profiles')
    //             .select('*')
    //             .eq('id', user.id)
    //             .single()

    //         if (profile) {

    //             if (loginTabRole && profile.role !== 'admin' && profile.role !== loginTabRole) {
    //                 message.error('선택한 회원 유형이 올바르지 않습니다.')
    //                 await supabase.auth.signOut()
    //                 logout()
    //                 return
    //             }
    //             setProfile(profile)
    //         }

    //     }

    //     init()
    // }, [isHydrated, loginTabRole, logout, message, setProfile])

    useEffect(() => {
        const supabase = supabaseClient()


        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (isLoggingIn || event === 'SIGNED_IN') {
            if (event === 'SIGNED_IN') {
                setIsLoggingIn(false); // 로그인 완료 시 플래그 해제
                const profile = await getUserFromServer();
                if (profile) setProfile(profile);
            }
            return; // 여기서 종료하여 성급한 로그아웃 방지
        }
            if (!session?.user.id) {
                // logout
                console.log('session is not exsite')
                await handleLogout()
                setNeedSignup(false);
                setNeedSignup(false)
                return
            }
            // const fetchProfile = async () => {

            //     const { data: profile, error } = await supabase
            //         .from('profiles')
            //         .select('*')
            //         .eq('id', session.user.id)
            //         .maybeSingle()

            //     if (!profile?.role || !profile?.phone_number) {
            //         setNeedSignup(true)
            //         setProfile(profile)
            //         return
            //     }

            //     if (loginTabRole && profile.role !== 'admin' && profile.role !== loginTabRole) {
            //         await supabase.auth.signOut()
            //         logout()
            //         return
            //     }

            //     setProfile(profile)

            //     if (error) {
            //         console.error('errorr kakaoloign', error)
            //         throw error
            //     }

            // }
            // fetchProfile()
            if (initialUser) {
                if (validateRole(initialUser)) {
                    setProfile(initialUser)
                } else {
                    console.log('second useeffect')
                    await handleLogout()
                }
                return
            }
            const profile = await getUserFromServer();

            if (!profile?.role || !profile?.phone_number) {
                setNeedSignup(true);
                setProfile(profile);
                return;
            }

            if (validateRole(profile)) {
                setProfile(profile);
            } else {
                await handleLogout();
            }
        })


        return () => {
            subscription.unsubscribe()
        }

    }, [setProfile, logout, setNeedSignup, loginTabRole, initialUser, validateRole, handleLogout, isLoggingIn, setIsLoggingIn])


    return (
        <>
            {children}
            {needSignup && (
                <>
                    <KakaoAddUserInfoModal
                        onClose={() => setNeedSignup(false)}
                    />
                </>
            )}
        </>
    )
}