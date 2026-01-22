'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthWidget } from '@/widgets/auth/ui/AuthWidget';

export default function LandingPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  //  비밀번호 실시간 체크
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });
  const isMatch = passwords.password !== '' && passwords.password === passwords.confirm;

  // 휴대폰 인증 관련 
  const [phone, setPhone] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  async function handleAuthAction(formData: FormData) {
    if (!isLogin && !isMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    await new Promise((res) => setTimeout(res, 1000));
    router.push('/home');
  }

  return (
    <div className=''>
      <AuthWidget />
    </div>
  )
}