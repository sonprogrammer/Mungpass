'use server'
import { postOwnerDocsProps } from "@/features/auth/model";
import { supabaseServer } from "@/shared/api/supabase/server";
import { ApiRes } from "@/shared/model";



export async function postOwnerDocs({ ownerId, storeInfo, businessNumber, DocsImg }: postOwnerDocsProps): Promise<ApiRes<null>> {
    try {


        const supabase = await supabaseServer()

        if (!ownerId) {
            return {
                success: false,
                message: '회원가입을 먼저 해주세요',
            }
        }

        let storagePath = null

        if (DocsImg) {
            const fileExt = DocsImg.name.split('.').pop()
            const fileName = `${crypto.randomUUID()}.${fileExt}`
            const filePath = `${ownerId}/${fileName}`

            const { error: uploadError } = await supabase.storage.from('owner-docs').upload(filePath, DocsImg)

            if (uploadError) {
                console.error('upload eeeor', uploadError)
                throw uploadError
            }

            storagePath = filePath
        }


        const { error: dbError } = await supabase.from('store_registrations')
            .insert({
                owner_id: ownerId,
                kakao_place_id: storeInfo.id,
                category_name: storeInfo.category_name,
                store_name: storeInfo.place_name,
                address_name: storeInfo.address_name,
                phone: storeInfo.phone,
                x: storeInfo.x,
                y: storeInfo.y,
                business_number: businessNumber,
                biz_reg_image_url: storagePath,
                status: 'PENDING',
                submitted_at: new Date().toISOString()
            })


        if (dbError) {
            if (storagePath) {
                await supabase.storage.from('owner-docs').remove([storagePath])
            }
            throw dbError
        }

        return { success: true, data: null}
    } catch (error) {
        console.error('postOwnerDocs error', error)

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : '사업자 등록 실패',
        }
    }
}