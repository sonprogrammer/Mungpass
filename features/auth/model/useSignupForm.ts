'use client'

import { checkEmail } from "@/features/auth/api/checkEmail";
import { useState } from "react";

export function useSignupForm() {
    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
    // *휴대폰 인증 관련 
    const [phone, setPhone] = useState<string>('')
    //*  비밀번호 실시간 체크
    const [passwords, setPasswords] = useState({ password: '', confirm: '' })
    const isMatch = passwords.password !== '' && passwords.password === passwords.confirm

    const handleEmailCheck = async () => {
        if (!email || !email.includes('@')) return;

        setEmailStatus('checking');
        const isTaken = await checkEmail(email);
        setEmailStatus(isTaken ? 'taken' : 'available');
    }

    return {
        email, setEmail,
        emailStatus, setEmailStatus,
        phone, setPhone,
        passwords, setPasswords,
        isMatch,
        handleEmailCheck
    }
}