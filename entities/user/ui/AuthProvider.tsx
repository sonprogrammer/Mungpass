'use client';

import React, { useCallback, useEffect, useRef } from "react";
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
    const { setNeedSignup, needSignup, setProfile, logout, loginTabRole, isHydrated, setIsLoggingIn } = useUserStore(
        useShallow(state => ({
            setNeedSignup: state.setNeedSignup,
            needSignup: state.needSignup,
            setProfile: state.setProfile,
            logout: state.logout,
            loginTabRole: state.loginTabRole,
            isHydrated: state.isHydrated,
            setIsLoggingIn: state.setIsLoggingIn
        })
        ))

    const { message } = App.useApp()
    const isLoggingOut = useRef(false)
    const isSignupFlow = useRef(false)


    useEffect(() => {
        if (typeof window === 'undefined') return
        isSignupFlow.current = window.location.pathname.includes('/signup')
    }, [])
    // console.log('initial user from authproficer', initialUser)

    const validateRole = useCallback((profile: UserProfile) => {
        // console.log('검증 대상 프로필:', profile);
        // console.log('현재 설정된 loginTabRole:', loginTabRole);
        if (isSignupFlow.current || isLoggingOut.current) return true

        if (!loginTabRole) return true
        if (profile.role !== 'admin' && profile.role !== loginTabRole) {
            // console.error('권한 불일치로 로그아웃 발생!');
            message.error('선택한 회원 유형이 올바르지 않습니다.dfa')
            return false
        }
        return true
    }, [loginTabRole, message])

    const handleLogout = useCallback(async () => {
        isLoggingOut.current = true
        await cookieLogout()
        logout()
        setTimeout(() => {
            isLoggingOut.current = false
        }, 0)
    }, [logout])

    const applyProfile = useCallback(
        async (profile: UserProfile | null) => {
            if (isLoggingOut.current) return
            if (!profile) {
                await handleLogout()
                return
            }

            if (!profile.role || !profile.phone_number) {
                setNeedSignup(true)
                setProfile(profile)
                return
            }

            if (!validateRole(profile)) {
                await handleLogout()
                return
            }

            setProfile(profile)
        }, [handleLogout, setNeedSignup, setProfile, validateRole])

    //* 서버에서 받은 유저 최초 반영
    useEffect(() => {
        if (!isHydrated) return
        if (!initialUser) return

        applyProfile(initialUser)
    }, [initialUser, isHydrated, applyProfile])


    useEffect(() => {
        const supabase = supabaseClient()


        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {

            if (event === 'SIGNED_IN') {
                setIsLoggingIn(false)
                const profile = await getUserFromServer();
                await applyProfile(profile)
                return;
            }

            if (event === 'SIGNED_OUT') {
                logout()
                setNeedSignup(false)
                return
            }
        })


        return () => {
            subscription.unsubscribe()
        }

    }, [setNeedSignup, setIsLoggingIn, applyProfile, logout])


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