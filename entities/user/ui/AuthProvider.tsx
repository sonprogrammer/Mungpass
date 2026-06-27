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


    const validateRole = useCallback((profile: UserProfile) => {
        if (isLoggingOut.current) return true
        if (isSignupFlow.current) return true

        if (!loginTabRole) return true
        if (profile.role !== 'admin' && profile.role !== loginTabRole) {
            message.error('선택한 회원 유형이 올바르지 않습니다.dfa')
            return false
        }
        return true
    }, [loginTabRole, message])

    const handleLogout = useCallback(async () => {
        if (isLoggingOut.current) return
        isLoggingOut.current = true
        await cookieLogout()
        logout()
        setTimeout(() => {
            isLoggingOut.current = false
        }, 0)
    }, [logout])

    const applyProfile = useCallback(async (profile: UserProfile | null) => {

        if (!profile) {
            await handleLogout()
            return
        }

        if (!profile.role || !profile.phone_number) {
            setNeedSignup(true)
            setProfile(profile)
            return
        }

        if (!isLoggingOut.current && !validateRole(profile)) {
            await handleLogout()
            return
        }

        setProfile(profile)
    }, [handleLogout, setNeedSignup, setProfile, validateRole])

    //* 서버에서 받은 유저 최초 반영
    useEffect(() => {
        if (!isHydrated || !initialUser) return

        applyProfile(initialUser)
    }, [initialUser, isHydrated, applyProfile])


    useEffect(() => {
        const supabase = supabaseClient()


        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!session) {
                if (!isLoggingOut.current) {
                    await handleLogout()
                }
                return
            }
            if (event === 'SIGNED_IN') {
                setIsLoggingIn(false)
                const profile = await getUserFromServer();
                await applyProfile(profile)
                return;
            }

            // if (event === 'SIGNED_OUT') {
            //     isSignupFlow.current = true
            //     isLoggingOut.current = true
            //     logout()
            //     setNeedSignup(false)
            //     return
            // }
        })


        return () => {
            subscription.unsubscribe()
        }

    }, [setNeedSignup, setIsLoggingIn, applyProfile, logout, handleLogout])


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