import { StepBar } from "@/features/auth/ui/owner/StepBar";

export default function OwnerSignupLayout({children}: {children: React.ReactNode}){
    return(
        <div className="w-full  pt-3 h-full flex flex-col">
            <header className="pb-2">
                {/* <h1 className="text-center font-black text-xl mb-4">사장님 회원가입</h1> */}
                <StepBar />
            </header>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}