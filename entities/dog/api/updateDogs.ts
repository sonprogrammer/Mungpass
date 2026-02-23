import { DogRegisterToSever } from "@/features/dog/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export async function updateDogs({ userId, dogId, formData,imageFile }: { userId: string, dogId: string, formData: DogRegisterToSever, imageFile?: File | null }) {
    const supabase = supabaseClient()


    if (!userId) throw new Error('login first')

    let imageUrl = formData.image_url
        
    if (imageFile) {
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${userId}-${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

        const { error : uploadError} = await supabase.storage.from('dog-images').upload(filePath, imageFile)

        if(uploadError) throw uploadError

        const { data: {publicUrl}} = supabase.storage.from('dog-images').getPublicUrl(filePath)

        imageUrl = publicUrl
    }

    const { data, error } = await supabase.from('dogs').update({
        name: formData.name,
        breed: formData.breed,
        weight: formData.weight,
        description: formData.description,
        birth_date: formData.birth_date,
        image_url: imageUrl 
    }).eq('id', dogId).eq('owner_id', userId)
        .select()

    if (error) {
        throw new Error(error.message)
    }
    if (!data || data.length === 0) throw new Error('can not find ')
    return data
}