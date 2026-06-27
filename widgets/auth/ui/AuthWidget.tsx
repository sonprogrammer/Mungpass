import { AuthFormSection } from "@/features/auth/ui/owner"
import { BigLogo } from "@/shared/ui"

export function AuthWidget() {

  return (
    <div className="h-screen w-full bg-amber-50 flex flex-col justify-center items-center p-4 font-sans overflow-hidden">
      {/*  //*로고 자리 */}
      <BigLogo />
      <AuthFormSection />

     
    </div>
  )
}

