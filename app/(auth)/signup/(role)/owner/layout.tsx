import { StepBar } from "@/features/auth/ui/owner/StepBar";

export default function OwnerSignupLayout({children}: {children: React.ReactNode}){
    return(
        <div className="w-full px-6 pt-6 h-full">
            <StepBar />
            {children}
        </div>
    )
}