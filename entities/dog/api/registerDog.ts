'use server'

import { supabaseServer } from "@/shared/api/supabase/server";
import { DogRegisterToSever } from "@/features/dog/model"
import { ApiRes } from "@/shared/model";

export async function registerDog(formData: DogRegisterToSever, image: File | null): Promise<ApiRes<null>> {
    try {

        const supabase = await supabaseServer()

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (!user || userError) {
            throw new Error('로그인이 필요합니다.');
        }


        let imageUrl = null

        if (image) {
            const fileExt = image.name.split('.').pop()
            // ! 보안을위해 user.id값을 뺌 
            const fileName = `${crypto.randomUUID()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('dog-images').upload(filePath, image)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage.from('dog-images').getPublicUrl(filePath)

            imageUrl = publicUrl
        }

        const { error } = await supabase.from('dogs').insert([{
            owner_id: user.id,
            name: formData.name,
            breed: formData.breed,
            weight: formData.weight || 0,
            description: formData.description,
            image_url: imageUrl,
            birth_date: formData.birth_date
        }])

        if (error) {
            console.error('강아지 등록 실패', error);
            throw new Error('강아지 등록에 실패했습니다.');
        }

        return {
            success: true,
            data: null,
        }
    } catch (error) {
        console.error('registerDog server action error', error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : '강아지 등록에 실패했습니다.',
        };

    }
}