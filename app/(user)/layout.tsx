import Header from "@/widgets/header/ui/Header";
import Navbar from "@/widgets/navbar/ui/Navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center bg-slate-200 h-screen">
            <div className="w-full max-w-120 bg-white h-screen flex flex-col relative shadow-2xl">
                <Header />

                <main className={`flex-1 bg-[#FFFBEB] overflow-y-auto `}>
                    {children}
                </main>

                <div className="bg-[#FFFBEB] w-full shrink-0">
                    <Navbar />
                </div>

            </div>
        </div>
    )
}