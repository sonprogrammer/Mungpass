'use server'
import { ApiRes } from '@/shared/model';

import { Dog } from "@/entities/dog/model";
import { supabaseServer } from "@/shared/api/supabase/server";

export async function fetchDogs(userId: string): Promise<ApiRes<Dog[]>> {
    try {

        const supabase = await supabaseServer()

        if (!userId) {
            return { success: false, message: '사용자 정보가 없습니다.'}
        }

        const { data, error } = await supabase.from('dogs').select('*').eq('owner_id', userId).is('deleted_at', null).order('created_at', { ascending: true })

        if (error) throw error

        return {success: true, data : data.map(dog => ({
            ...dog,
            imageUrl: dog.image_url,
            birthDate: dog.birth_date
        }))}
    } catch (error) {
        console.error('반려견 목록 조회 실패', error)
        return { success: false, message:'반려견 목록을 불러오기 실패'}
    }
}