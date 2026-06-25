'use server'
import { supabaseServer } from "@/shared/api/supabase/server";


export const ownerHasStore = async(ownerId: string) => {
    const supabase = await supabaseServer()
    
    const { data: shop} = await supabase.from('shops').select('id, status, name').eq('owner_id', ownerId).maybeSingle()

    if(shop) return {
        id: shop.id,
        status: shop.status,
        name: shop.name,
        origin: 'shops' 
    }

    const { data: regist} = await supabase.from('store_registrations').select('id, status').eq('owner_id', ownerId).maybeSingle()

    if(regist){
        const statusMap: Record<string, string> = {
            'APPROVED': 'verified',
            'PENDING': 'pending',
            'REJECTED': 'rejected'
        };
        return {
            id: regist.id,
            status: statusMap[regist.status] || 'pending',
            name: '심사 진행 중', 
            origin: 'store_registrations'
        }
    }
    
    return null
}