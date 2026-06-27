
import { useUserStore } from "@/entities/user/model";
import { regularLogin, signup } from "@/features/auth/api";
import { App } from "antd";

export function useAuthForm(mode: 'login' | 'signup', OwnerSuccess?: (id: string) => void) {
  const { message } = App.useApp()
  const setIsLoggingIn = useUserStore(state => state.setIsLoggingIn)

  const handleAuthAction = async (formData: FormData) => {
    if (mode === 'login') {
      try {
        setIsLoggingIn(true);
        const res = await regularLogin(formData)
        if(!res.success){
          message.error(res.message)
          setIsLoggingIn(false)
          return
        }
        message.success('로그인 성공')

      } catch (error) {
        setIsLoggingIn(false);
        message.error('로그인 서버 통신 중 에러가 발생하였습니다. 다시 시도해주세요')
      }
    } else {
      const pw = formData.get('password')
      const pwConfirm = formData.get('passwordConfirm')

      if (pw !== pwConfirm) {
        message.error("비밀번호가 일치하지 않습니다.")
        return
      }

      try {
        const res = await signup(formData)
        if (!res.success) {
          message.error(res.message)
          return
        }
        if (!res.data) return

        //*사장이면 다음단계로 이동
        OwnerSuccess?.(res.data.id)



      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.';
        message.error(errorMessage)
      }
    }
  };

  return { handleAuthAction }
}