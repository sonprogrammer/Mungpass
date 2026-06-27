'use client'

import { checkEmail } from "@/features/auth/api";
import { App } from "antd";
import { useState } from "react";

export function useSignupForm() {
    const [name, setName]= useState('')
    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState<'idle' | 'invalid' | 'checking' | 'available' | 'taken'>('idle')
    // *휴대폰 인증 관련 
    const [phone, setPhone] = useState<string>('')
    //*  비밀번호 실시간 체크
    const [passwords, setPasswords] = useState({ password: '', confirm: '' })
    const isMatch = passwords.password !== '' && passwords.password === passwords.confirm

    const { message } = App.useApp()
    

    const handleEmailCheck = async () => {
        if (!email || !email.includes('@')) {
            message.error('이메일을 확인해주세요')
            setEmailStatus('invalid')
            return
        }

        setEmailStatus('checking')
        const res = await checkEmail(email)

        if(!res.success) {
            message.error(res.message)
            setEmailStatus('idle')
            return
        }
        setEmailStatus(res.data ? 'taken' : 'available')
    }

    return {
        name, setName,
        email, setEmail,
        emailStatus, setEmailStatus,
        phone, setPhone,
        passwords, setPasswords,
        isMatch,
        handleEmailCheck
    }
}