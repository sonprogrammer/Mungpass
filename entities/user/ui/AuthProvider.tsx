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
            if (!session?.user) {
                    logout()
                    setIsOpenInfoModal(false)
                    return
                }

                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle()

                    console.log('profile', profile)
console.log('error', error)
console.log('user id', session.user.id)

                if (error) {
                    console.error(error.message)
                    return
                }

                setProfile(profile)

                if (!profile?.role || !profile?.phone_number) {
                    setIsOpenInfoModal(true)
                } else {
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