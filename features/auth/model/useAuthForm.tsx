'use client'
import { signup } from "../api/signup";
import { regularLogin } from "../api/regularLogin";
import { useRouter } from "next/navigation";

export function useAuthForm(mode: 'login' | 'signup') {
  const router = useRouter();

  const handleAuthAction = async (formData: FormData) => {
    if (mode ==='login') {
      try {
        await regularLogin(formData)
        router.push('/home')
      } catch {
        alert('로그인 정보를 확인해주세요.')
      }
    } else {
      const pw = formData.get('password')
      const pwConfirm = formData.get('passwordConfirm')

      if (pw !== pwConfirm) {
        alert("비밀번호가 일치하지 않습니다.")
        return
      }

      try {
        await signup(formData)
        alert("회원가입 완료! 로그인창으로 이동합니다.")
        router.push('/')
      } catch {
        alert("회원가입 중 에러가 발생했습니다.")
      }
    }
  };

  return { handleAuthAction }
}