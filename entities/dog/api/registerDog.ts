import { supabaseClient } from "@/shared/api/supabase/client";
import { DogRegisterToSever } from "@/features/dog/model"

export async function registerDog(formData: DogRegisterToSever, image: File | null, userId: string) {
    const supabase = supabaseClient()

    if(!userId) throw new Error('login first')

    let imageUrl = null

    if(image){
        const fileExt = image.name.split('.').pop()
        const fileName = `${userId}-${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const {error: uploadError} = await supabase.storage.from('dog-images').upload(filePath, image)

        if(uploadError) throw new Error('강아지 프로필 사진 업로드 에러')

        const { data: {publicUrl}} = supabase.storage.from('dog-images').getPublicUrl(filePath)
        
        imageUrl = publicUrl
    }

    const { error } = await supabase.from('dogs').insert([{
        owner_id: userId,
        name: formData.name,
        breed: formData.breed,
        weight: formData.weight || 0,
        description: formData.description,
        image_url: imageUrl,
        birth_date: formData.birth_date
    }])

    if(error) throw new Error('강아지 등록 실패 에러')
}