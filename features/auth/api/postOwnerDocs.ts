import { postOwnerDocsProps } from '@/features/auth/model/types';
import { KakaoPlace } from './../../../shared/model/map';
import { supabaseClient } from "@/shared/api/supabase/client";



export async function postOwnerDocs({storeInfo, businessNumber, DocsImg}: postOwnerDocsProps) {
    const supabase = supabaseClient()

    const { data :{user}, error: userError} = await supabase.auth.getUser()

    if(userError || !user) throw new Error('')

}