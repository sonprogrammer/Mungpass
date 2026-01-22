import { Dog } from "lucide-react";

export function BigLogo (){
    return(
        <div className="mb-8 text-center shrink-0 animate-bounce-slow">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-3 shadow-lg shadow-orange-200">
          <Dog className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
          멍 <span className="text-orange-500">패스</span>
        </h1>
        <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">MungPass - Membership</p>
      </div>
    )
}