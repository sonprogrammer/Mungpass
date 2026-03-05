import { Check, Clock } from "lucide-react";

export function SuccessMsg() {
    return (
        <div className="flex flex-col items-center">
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-orange-100 rounded-[2.5rem] flex items-center justify-center animate-bounce-short">
                    <Check className="w-12 h-12 text-orange-600 stroke-[3px]" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white shadow-lg rounded-full p-2">
                    <Clock className="w-6 h-6 text-slate-400" />
                </div>
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-slate-800">심사 요청 완료!</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                    제출하신 서류를 관리자가 검토 중입니다.<br />
                    승인까지 영업일 기준 <span className="text-orange-600 font-bold">1~2일</span>이 소요됩니다.
                </p>
            </div>
        </div>
    )
}