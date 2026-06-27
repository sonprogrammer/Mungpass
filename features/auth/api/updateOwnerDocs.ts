'use server'

import { UpdateDocsInfo } from "@/features/auth/model";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";


export const updateOwnerDocs = async ({ id, ownerId, storeInfo, businessNumber, DocsImg }: UpdateDocsInfo): Promise<ApiRes<null>> => {
    try {


        const supabase = await supabaseServer()

        if (!ownerId) {
            return {
                success: false,
                message: '회원가입을 먼저 진행해주세요',
            }
        }

        let storagePath = typeof DocsImg === 'string' ? DocsImg : null

        if (DocsImg instanceof File) {
            const fileExt = DocsImg.name.split('.').pop()
            const fileName = `${crypto.randomUUID()}.${fileExt}`
            const filePath = `${ownerId}/${fileName}`

            const { error: uploadError } = await supabase.storage.from('owner-docs').upload(filePath, DocsImg)

            if (uploadError) {
                console.error('upload eeeor', uploadError)
                throw new Error('업로드 오류 발생')
            }

            storagePath = filePath
        }


        const { error } = await supabase.from('store_registrations').upsert([
            {
                id,
                owner_id: ownerId,
                business_number: businessNumber,
                biz_reg_image_url: storagePath,
                status: 'PENDING',
                rejection_reason: null,
                re_submit_at: new Date().toISOString(),
                address_name: storeInfo.address_name,
                kakao_place_id: storeInfo.id,
                phone: storeInfo.phone,
                store_name: storeInfo.place_name,
                x: storeInfo.x,
                y: storeInfo.y
            }
        ]).select()

        if (error) {
            console.error('재 제출 오류 api', error)
            throw new Error('재 재출 오류 발생')
        }

        return {success: true, data: null}

    } catch(error) {
        return { success: false, message: error instanceof Error ? error.message : '재 제출 실패'}
    }
}
