import { StepStatusProps } from "@/features/auth/model/types";
import { Check , X} from "lucide-react";

export function StepStatus({ title, desc, done, active, isError }: StepStatusProps) {
    return (
        <div className="flex gap-4">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors
                ${isError 
                    ? 'bg-rose-500' // 반려 시 강렬한 레드/로즈
                    : done 
                        ? 'bg-orange-500' 
                        : active 
                            ? 'border-2 border-orange-500' 
                            : 'bg-slate-100'
                }`}
            >
                {/* 상태별 아이콘 분기 */}
                {isError ? (
                    <X className="w-3 h-3 text-white" /> // 반려 시 X
                ) : done ? (
                    <Check className="w-3 h-3 text-white" />
                ) : active ? (
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                ) : null}
            </div>
            <div className="flex-1">
                <h4 className={`text-sm font-bold ${active ? 'text-slate-800' : done ? 'text-slate-400' : 'text-slate-300'}`}>{title}</h4>
                <p className="text-[11px] text-slate-400">{desc}</p>
            </div>
        </div>
    )
} 