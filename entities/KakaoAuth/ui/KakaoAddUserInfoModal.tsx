'use client'

import { useUserStore } from "@/entities/user/model/useUserStore"
import { supabaseClient } from "@/shared/api/supabase/client"
import { App, Button, Input, Modal, Radio } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function KakaoAddUserInfoModal({onClose} : {onClose: () => void}) {
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState<'user' | 'owner' | 'admin' | null>(null)
    const [loading, setLoading] = useState(false)
    const setProfile = useUserStore(state => state.setProfile)
    const router = useRouter()
    const supabase = supabaseClient()

    const {message} =App.useApp()

    const handleComplete = async() => {
        if(!phone || !role) return message.warning('필수 정보를 입력해주세요')

        setLoading(true)

        try {
            const { data : {user}} = await supabase.auth.getUser()
            if(user){
                const {error} = await supabase.from('profiles').update({phone_number: phone, role}).eq('id', user.id)
                if(error){
                    console.error('카카오 회원가입 에러 ',error)
                    throw error
                }
                const {data : updateProfile} = await supabase.from('profiles').select('*').eq('id', user.id).single()


                setProfile(updateProfile)
                if(updateProfile.role === 'owner'){
                    router.push('/owner')
                }else if(updateProfile.role === 'user'){
                    router.push('/home')
                }else if(updateProfile.role === 'admin'){
                    router.push('/admin')
                }
                message.success('멍패스 회원가입 완료')
                onClose()
            }
        } catch (error) {
            console.error('카카오 회원 가입 에러발생', error)   
            message.error('등록중 오류가 발생하였습니다. 다시 시도 해주세요')
        }finally{
            setLoading(false)
        }
    }
    
    return(
        <Modal
            title={<div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>원활한 이용을 위해 아래 정보를 입력해주세요</div>}
            open={true}
            footer={null}
            closable={false}
            maskClosable={false}
            centered
            width={400}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>휴대폰 번호</label>
                    <Input 
                        type="tel" 
                        placeholder="- 없이 숫자만 입력해 주세요" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        size="large"
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>회원 유형 선택</label>
                    <Radio.Group 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', display: 'flex', gap: '12px' }}
                    >
                        <Radio.Button value="owner" required style={{ flex: 1, height: '54px', lineHeight: '54px', textAlign: 'center', borderRadius: '8px' }}>
                            🏪 사장님으로 시작
                        </Radio.Button>
                        <Radio.Button value="user" required style={{ flex: 1, height: '54px', lineHeight: '54px', textAlign: 'center', borderRadius: '8px' }}>
                            🐶 반려인으로 시작
                        </Radio.Button>
                    </Radio.Group>
                </div>
                
                <Button 
                    type="primary" 
                    size="large" 
                    block 
                    onClick={handleComplete}
                    loading={loading}
                    style={{ 
                        height: '50px', 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        backgroundColor: '#f97316', 
                        borderColor: '#f97316',
                        borderRadius: '8px',
                        marginTop: '10px'
                    }}
                >
                    가입 완료하기
                </Button>
                
            </div>

        </Modal>
    )
}