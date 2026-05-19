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



    useEffect(() => {

        const supabase = supabaseClient()

        const init = async () => {

            const { data: { session } } = await supabase.auth.getSession()

            if (!session?.user) {
                logout()
                return
            }

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle()
                 console.log('PROFILE', profile)
    console.log('PROFILE ERROR', error)
                

            if (error) {
                console.error(error.message)
                return
            }

            setProfile(profile)

            if (!profile?.role || !profile?.phone_number) {
                console.log('NEED SIGNUP TRUE')
                setNeedSignup(true)
            } else {
                console.log('NEED SIGNUP FALSE')
                setNeedSignup(false)
            }
        }

        init()

        const { data: { subscription } } =
            supabase.auth.onAuthStateChange(async (_, session) => {

                if (!session?.user) {
                    logout()
                    setNeedSignup(false)
                    return
                }

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle()

                setProfile(profile)
                console.log('profile', profile)
console.log('role', profile?.role)
console.log('phone', profile?.phone_number)

                if (!profile?.role || !profile?.phone_number) {
                    setNeedSignup(true)
                } else {
                    setNeedSignup(false)
                }
            })

        return () => {
            subscription.unsubscribe()
        }

    }, [setProfile, logout, setNeedSignup])

    console.log('needSignup', needSignup)

    return (
        <>
            {children}
            {needSignup && (
                <>
                    {console.log('MODAL RENDER')}
                    <KakaoAddUserInfoModal
                        onClose={() => setNeedSignup(false)}
                    />
                </>
            )}
        </>
    )
}