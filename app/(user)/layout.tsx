
import { UserRoleGuard } from "@/features/auth/ui";
import { GlobalLiveUsage } from "@/widgets/dog/ui";
import Header from "@/widgets/header/ui/Header";
import Navbar from "@/widgets/navbar/ui/Navbar";
import { App } from "antd";

export default function UserLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex justify-center bg-slate-200 h-dvh">
            <App className="w-full h-full">
                <div className="w-full max-w-120 bg-white h-full flex flex-col relative mx-auto shadow-2xl">
                    <Header />

                    <main className={`flex-1 w-full bg-amber-50 overflow-y-auto `}>
                        <UserRoleGuard>
                            {children}
                        </UserRoleGuard>
                    </main>

                    <div className="absolute bottom-24 left-0 right-0 z-60 px-4 pointer-events-none">
                        <div className="pointer-events-auto">
                            <GlobalLiveUsage />
                        </div>
                    </div>

                    <div className="bg-amber-50 w-full shrink-0">
                        <Navbar />
                    </div>

                </div>
            </App>
        </div>
    )
}