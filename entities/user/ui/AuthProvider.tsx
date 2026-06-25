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
    const { setNeedSignup, needSignup, setProfile, logout, loginTabRole, isHydrated } = useUserStore(
        useShallow(state => ({
            setNeedSignup: state.setNeedSignup,
            needSignup: state.needSignup,
            setProfile: state.setProfile,
            logout: state.logout,
            loginTabRole: state.loginTabRole,
            isHydrated: state.isHydrated
        })
        ))

    const { message } = App.useApp()

    const validateRole = useCallback((profile: UserProfile) => {
        if (loginTabRole && profile.role !== 'admin' && profile.role !== loginTabRole) {
            message.error('선택한 회원 유형이 올바르지 않습니다.')
            return false
        }
        return true
    },[loginTabRole, message])

    const handleLogout = useCallback(async () => {
        await cookieLogout()
        logout()
    },[logout])

    useEffect(() => {
        if (!isHydrated) return;
        if (initialUser) {
            if (validateRole(initialUser)) {
                setProfile(initialUser)
            } else {
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
            if (!session?.user.id) {
                // logout
                await handleLogout()
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

    }, [setProfile, logout, setNeedSignup, loginTabRole, initialUser, validateRole, handleLogout])


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