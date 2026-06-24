import { supabaseClient } from "@/shared/api/supabase/client";

export const getUserInfo = async (params: { keyword?: string, role?: string, ownerStatus?: string }) => {
    const supabase = supabaseClient()

    //* 키워드 없고 전체 유저 정보 불러올때 
    let query = supabase.from('profiles').select(`*, shop:shops(*), store_registrations: store_registrations(*)`)



    //* 회원 검색용
    if (params.keyword && params.keyword.trim() !== '') {
        const { data: userInfo, error } = await supabase.rpc('search_users', { 
            keyword: params.keyword.trim() ,
            p_role: params.role === 'all' ? null : params.role ?? null,
            p_owner_status: params.ownerStatus === 'all' ? null : params.ownerStatus ?? null
        })

        if (error) {
            console.error('회원 정보 조회 api error', error)
            throw error
        }
        return userInfo || []
    }

    // *역할별 탭했을 시
    if (params.role === 'user' || params.role === 'owner') {
        query = query.eq('role', params.role)
    }

    // *사장내에서 검색시
    if (params.role === 'owner' && params.ownerStatus === 'pending') {
        query = query.select(`
        *, shop:shops(*), store_registrations:store_registrations!inner(*)
    `).eq('store_registrations.status', 'PENDING')
    } else if (params.role === 'owner' && params.ownerStatus === 'rejected') {
        query = query.select(`
        *, shop:shops(*), store_registrations:store_registrations!inner(*)
    `).eq('store_registrations.status', 'REJECTED')
    } else if (params.role === 'owner' && params.ownerStatus === 'registered') {
        query = query.select(`
        *, shop:shops!inner(*), store_registrations:store_registrations(*)
    `).eq('shops.status', 'verified')
    }


    //* 전체 회원
    // ! supabase는 한번에 최대 1000개 행만 가져옴 
    const { data: userInfo, error } = await query.order('join_date', { ascending: false }).range(0, 19)

    if (error) {
        console.error('회원정보 조회 api error', error)
        throw error
    }


    return userInfo || []
}