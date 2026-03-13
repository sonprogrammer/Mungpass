import { supabaseClient } from "@/shared/api/supabase/client";

export const getAdminUrl = async (path?: string) => {
    if (!path) return null

    const { data, error } = await supabaseClient.storage
        .from('owner-docs')
        .createSignedUrl(path, 300)

    if (error) {
        console.error(error)
        return null
    }

    return data.signedUrl
}