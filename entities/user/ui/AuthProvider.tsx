'use client';

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { supabaseClient } from "@/shared/api/supabase/client";
import { KakaoAddUserInfoModal } from "@/entities/KakaoAuth/ui/KakaoAddUserInfoModal";
import { useShallow } from "zustand/react/shallow";
import { App } from "antd";

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

    const {message} = App.useApp()

    useEffect(() => {

        if(!isHydrated) return
        const init = async () => {
            const supabase = supabaseClient()

            const {
                data: { user }
            } = await supabase.auth.getUser()

            if (!user) return

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (profile) {

                if (loginTabRole && profile.role !== 'admin' && profile.role !== loginTabRole) {
                    message.error('선택한 회원 유형이 올바르지 않습니다.')
                    await supabase.auth.signOut()
                    logout()
                    return
                }
                setProfile(profile)
            }

        }

        init()
    }, [isHydrated, loginTabRole, logout, message, setProfile])

    useEffect(() => {
        const supabase = supabaseClient()


        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!session?.user.id) {
                logout()
                setNeedSignup(false)
                return
            }
            const fetchProfile = async () => {

                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle()

                if (!profile?.role || !profile?.phone_number) {
                    setNeedSignup(true)
                    setProfile(profile)
                    return
                }

                if (loginTabRole && profile.role !== 'admin' && profile.role !== loginTabRole) {
                    await supabase.auth.signOut()
                    logout()
                    return
                }

                setProfile(profile)

                if (error) {
                    console.error('errorr kakaoloign', error)
                    throw error
                }

            }
            fetchProfile()
        })


        return () => {
            subscription.unsubscribe()
        }

    }, [setProfile, logout, setNeedSignup, loginTabRole])


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