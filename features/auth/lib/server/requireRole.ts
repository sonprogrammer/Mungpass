import 'server-only'
import { supabaseServer } from '@/shared/api/supabase/server'
import { redirect } from 'next/navigation'


type Role = 'user' | 'admin' | 'owner'

const rolePath: Record<Role, string> = {
    user: '/home',
    owner: '/owner',
    admin: '/admin'
}

function isRole(value: unknown): value is Role {
    return value === 'user' || value ==='owner' || value ==='admin'
}

export async function requireRole(allowRole: Role){
    const supabase = await supabaseServer()
    const { data: {user}, error: userError} = await supabase.auth.getUser()

    if(userError || !user){
        redirect('/')
    }

    const { data: profile, error: profileError} = await supabase.from('profiles').select('id, role').eq('id', user.id).maybeSingle()

    if(profileError){
        console.error('역할조회 실패', profileError)
        throw new Error('사용자 권한을 확인하지 못했습니다.')
    }

    if(!profile || !isRole(profile.role)){
        redirect('/')
    }

    if(profile.role !== allowRole){
        redirect(rolePath[profile.role])
    }

    return { user, profile}
}

