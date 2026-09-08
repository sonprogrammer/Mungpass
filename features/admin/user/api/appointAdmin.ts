'use server'

import { supabaseServer } from "@/shared/api/supabase/server"

export async function appointAdmin(targetUserId: string) {
    const supabase = await supabaseServer()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return {
            success: false,
            message: '로그인이 필요합니다.',
        }
    }

    //현재 로그인된 유저의 권한확인을 위함
    const { data: requester } = await supabase.from('profiles').select('role').eq('id', user.id).single()

    if (requester?.role !== 'admin') {
        return {
            success: false,
            message: '관리자 임명 권한이 없습니다.',
        }
    }

    const { data: target } = await supabase.from('profiles').select('id, name,email, role').eq('id', targetUserId).single()

    if (!target) {
        return {
            success: false,
            message: '사용자를 찾을 수 없습니다.',
        }
    }

    if (target.role === 'admin') {
        throw new Error('이미 관리자입니다')
    }

    const { error } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', targetUserId)

    if (error) {
        return {
            success: false,
            message: '관리자 임명에 실패했습니다.',
        }
    }

    return { success: true }
}