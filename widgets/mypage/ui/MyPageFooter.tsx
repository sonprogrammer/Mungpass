import { LogoutBtn } from "@/features/auth/ui/LogoutBtn";

export function MyPageFooter({user}) {
    return(
        <div className="pt-4 flex flex-col items-center gap-4">
          <LogoutBtn />
          <p className="text-[10px] text-slate-300 font-bold">
            가입일: {user.joinDate} | 멍패스(MungPass) 
          </p>
        </div>
    )
}