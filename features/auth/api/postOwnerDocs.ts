import { postOwnerDocsProps } from "@/features/auth/model";
import { supabaseClient } from "@/shared/api/supabase/client";



export async function postOwnerDocs({ownerId, storeInfo, businessNumber, DocsImg}: postOwnerDocsProps) {
    const supabase = supabaseClient()
    
    if(!ownerId){
        return { error : '회원가입을 먼저 해주세요'}
    }

    let storagePath = null

    if(DocsImg){
        const fileExt = DocsImg.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${ownerId}/${fileName}`

        const {error: uploadError} = await supabase.storage.from('owner-docs').upload(filePath, DocsImg)

        if(uploadError) {
            console.error('upload eeeor', uploadError)
            throw uploadError
        }

        storagePath = filePath
    }
            
        
        const {error: dbError} = await supabase.from('store_registrations')
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
        

        if(dbError){
            if(storagePath){
                await supabase.storage.from('owner-docs').remove([storagePath])
            }
            throw dbError
        }
                        


}