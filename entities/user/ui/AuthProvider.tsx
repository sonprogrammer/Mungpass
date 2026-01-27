'use client';

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/model/useUserStore"; 
import { supabaseClient } from "@/shared/api/supabase/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const setProfile = useUserStore(state => state.setProfile);

    useEffect(() => {
        const supabase = supabaseClient();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {

            if (session?.user) {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle();

                if (error) {
                    console.error(error.message);
                } else {
                    console.log(profile);
                    setProfile(profile);
                }
            } else {
                setProfile(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [setProfile]);

    return <>{children}</>;
}