'use client'
import { regularLogin, signup } from "@/features/auth/api";
import { App } from "antd";

export function useAuthForm(mode: 'login' | 'signup', OwnerSuccess?: (id: string) => void) {
  const { message } = App.useApp()

  const handleAuthAction = async (formData: FormData) => {
    if (mode === 'login') {
      try {
        await regularLogin(formData)


      } catch (error: unknown) {
        message.error(error instanceof Error ? error.message : '로그인 중 에러가 발생하였습니다. 다시 시도해주세요')
      }
    } else {
      const pw = formData.get('password')
      const pwConfirm = formData.get('passwordConfirm')

      if (pw !== pwConfirm) {
        message.error("비밀번호가 일치하지 않습니다.")
        return
      }

      try {
        const user = await signup(formData)
        if (user && 'error' in user) {
          message.error(user.error)
          return
        }

        //*사장이면 다음단계로 이동
        if (OwnerSuccess && user?.id) {
          OwnerSuccess(user.id)
        }



      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.';
        message.error(errorMessage)
      }
    }
  };

  return { handleAuthAction }
}