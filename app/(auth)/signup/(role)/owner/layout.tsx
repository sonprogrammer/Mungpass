
import { StepBar } from "@/features/auth/ui/owner";
import { Suspense } from "react";

export default function OwnerSignupLayout({children}: {children: React.ReactNode}){
    return(
        <div className="w-full  pt-3 h-full flex flex-col">
            <header className="pb-2">
                <Suspense fallback={null}>
                    <StepBar />
                </Suspense>
            </header>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}