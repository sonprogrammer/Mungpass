import { SmallLogo } from "@/shared/ui";


export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center h-screen bg-slate-200">
            <div className="w-full max-w-120 bg-white flex flex-col ">

                <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/70 backdrop-blur-md">
                    <div>
                        <SmallLogo />
                    </div>
                </header>
                <main className="flex-1 flex flex-col items-center w-full bg-amber-50 overflow-y-auto ">
                    {children}
                </main>
            </div>
        </div>
    )
}