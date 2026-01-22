import { useState } from 'react';

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });
  const [phone, setPhone] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const isMatch = passwords.password !== '' && passwords.password === passwords.confirm;

  return {
    isLogin, setIsLogin,
    passwords, setPasswords,
    phone, setPhone,
    isCodeSent, setIsCodeSent,
    isVerified, setIsVerified,
    isMatch
  };
}