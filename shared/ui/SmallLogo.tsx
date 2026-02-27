import { BackBtn } from "@/shared/ui/BackBtn";
import Link from "next/link";

export function SmallLogo() {
    return (
        <div className="w-full text-center flex relative py-5">
            <div className="absolute pl-6">
                <BackBtn />
            </div>
            <Link href='/' className="flex flex-col items-center justify-center w-full">
                <h1 className="text-xl font-black tracking-tighter text-slate-800">
                    멍 <span className="text-orange-500">패스</span>
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 ml-1 uppercase">
                    Partner
                </span>
            </Link>
        </div>
    )
}