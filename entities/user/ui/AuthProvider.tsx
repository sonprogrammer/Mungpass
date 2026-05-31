'use client';

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { supabaseClient } from "@/shared/api/supabase/client";
import { KakaoAddUserInfoModal } from "@/entities/KakaoAuth/ui/KakaoAddUserInfoModal";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const setNeedSignup = useUserStore(state => state.setNeedSignup)
    const needSignup = useUserStore(state => state.needSignup)
    const setProfile = useUserStore(state => state.setProfile)
    const logout = useUserStore(state => state.logout)
    const loginTabRole = useUserStore(state => state.loginTabRole)


    useEffect(() => {
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

            setProfile(profile)
        }

        init()
    }, [setProfile])

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

                if(loginTabRole && profile.role !== 'admin' && profile.role !== loginTabRole){
                    await supabase.auth.signOut()
                    logout()
                    return
                }

                setProfile(profile)

                if (error) {
                    console.error('errorr kakaoloign', error)
                    throw error
                }


                if (!profile?.role || !profile?.phone_number) {
                    setNeedSignup(true)
                } else {
                    setNeedSignup(false)
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