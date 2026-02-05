import { Info } from "lucide-react";
import { NoResultProps } from "@/shared/model/noresultTypes";

export const NoResult = ({ 
    title, 
    description, 
    icon = <Info className="w-6 h-6 text-orange-300" /> 
}: NoResultProps) => {
    return(
        <div className="mt-10 flex flex-col items-center justify-center p-10 bg-orange-50/30 rounded-4xl border-2 border-dashed border-orange-100">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    {icon}
                </div>
                <p className="text-sm font-extrabold text-slate-600 mb-1">{title}</p>
                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                    {description}
                </p>
            </div>
    )
}