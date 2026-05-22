import { AuthFormSection } from "@/features/auth/ui/owner/AuthFormSection"
import { BigLogo } from "@/shared/ui/BigLogo"

export function AuthWidget() {

  return (
    <div className="h-screen w-full bg-[#FFFBEB] flex flex-col justify-center items-center p-4 font-sans overflow-hidden">
      {/*  //*로고 자리 */}
      <BigLogo />
      <AuthFormSection />

     
    </div>
  )
}

