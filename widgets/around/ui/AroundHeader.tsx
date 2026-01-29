import { AroundHeaderProps } from "@/entities/place/model/types";
import { Map as MapIcon, Search, X } from "lucide-react";

export function AroundHeader({showMap, toggle} : AroundHeaderProps) {
    return (
        <section className="p-6 bg-white rounded-b-[3rem] shadow-sm space-y-4 sticky top-0 z-30">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">어디로 갈까요?</h2>
                    <p className="text-orange-500 text-sm font-bold">내 주변 멍패스 샵 🐾</p>
                </div>
                <button onClick={toggle} className={`p-3 rounded-2xl transition-all flex items-center gap-2 font-black text-xs ${showMap ? 'bg-orange-500 text-white shadow-lg' : 'bg-orange-50 text-orange-500'}`}>
                    {showMap ? <X className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
                    {showMap ? '닫기' : '지도보기'}
                </button>
            </div>

            {/* //*검색창, 필터*/}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
                <input type="text" placeholder="동네 이름이나 시설명을 검색해보세요" className="w-full pl-12 pr-4 py-4 bg-orange-50/50 border-2 border-orange-50 rounded-2xl outline-none focus:border-orange-500 transition-all text-sm font-bold" />
            </div>
        </section>
    )
}