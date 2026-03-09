'use client'
import { signup } from "../api/signup";
import { regularLogin } from "../api/regularLogin";
import { useRouter } from "next/navigation";

export function useAuthForm(mode: 'login' | 'signup', OwnerSuccess?: (id: string) => void) {
  const router = useRouter();

  const handleAuthAction = async (formData: FormData) => {
    if (mode ==='login') {
      try {
        const user = await regularLogin(formData)
        console.log('user', user)
        if(user.actualRole === 'admin'){
          router.push('/admin')
        }else{
          router.push('/home')
        }
      } catch(error: unknown) {
        alert(error instanceof Error ? error.message : '로그인 중 에러가 발생하였습니다. 다시 시도해주세요')
      }
    } else {
      const pw = formData.get('password')
      const pwConfirm = formData.get('passwordConfirm')

      if (pw !== pwConfirm) {
        alert("비밀번호가 일치하지 않습니다.")
        return
      }

      try {
        const user = await signup(formData)


        //*사장이면 다음단계로 이동
        if(OwnerSuccess && user?.id){
          OwnerSuccess(user.id)
        }
        
      } catch {
        alert("회원가입 중 에러가 발생했습니다.")
      }
    }
  };

  return { handleAuthAction }
}