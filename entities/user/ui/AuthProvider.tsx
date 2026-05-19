'use client';

import { useEffect, useState } from "react";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { supabaseClient } from "@/shared/api/supabase/client";
import { KakaoAddUserInfoModal } from "@/entities/KakaoAuth/ui/KakaoAddUserInfoModal";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(false)
    const setProfile = useUserStore(state => state.setProfile)
    const logout = useUserStore(state => state.logout)



    useEffect(() => {
        const supabase = supabaseClient()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('session', session)
            if (!session?.user) {
                logout()
                setIsOpenInfoModal(false)
                return
            }
            if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {

                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle()
                console.log('profile form authprovider', profile)
                if (error) {
                    console.error('kakao login error ', error.message)
                    return
                }

                if (!profile || !profile.role || !profile.phone_number) {
                    setProfile(profile)
                    setIsOpenInfoModal(true)
                } else {
                    setProfile(profile)
                    setIsOpenInfoModal(false)
                }

            } else if (event === "SIGNED_OUT") {
                console.log('sesession', subscription)
                setProfile(null)
                setIsOpenInfoModal(false)
            }
        })

        return () => {
            subscription.unsubscribe()
        };
    }, [setProfile, logout])

    return (
        <>
            {children}
            {isOpenInfoModal && (
                <KakaoAddUserInfoModal onClose={() => setIsOpenInfoModal(false)} />
            )}
        </>
    )
}