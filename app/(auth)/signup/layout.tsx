import { SmallLogo } from "@/shared/ui/SmallLogo";

export default function SignupLayout({children}: {children: React.ReactNode}){
    return(
        <div className="flex flex-col h-screen">
            <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/70 backdrop-blur-md">
                <div>
                    <SmallLogo />
                </div>
            </header>
            <main className="flex-1 flex flex-col items-center w-full">
                {children}
            </main>
        </div>
    )
}