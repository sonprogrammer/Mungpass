import { Dog } from "@/entities/dog/model/types";
import { supabaseClient } from "@/shared/api/supabase/client";

export async function fetchDogs (userId: string): Promise<Dog[]> {
    const supabase = supabaseClient()

    if(!userId) throw new Error('login first')

    const {data, error} = await supabase.from('dogs').select('*').eq('owner_id', userId).order('created_at', {ascending: true})

    if(error) throw error
    console.log('data from get hooks', data)

    return data.map(dog => ({
        ...dog,
        imageUrl: dog.image_url,
        birthDate: dog.birth_date
    }))
}