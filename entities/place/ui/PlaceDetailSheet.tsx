import { KakaoPlace } from "@/shared/types/map";
import { MapPin, Navigation, Phone, Star } from "lucide-react";


export function PlaceDetailSheet({ place }: { place: KakaoPlace }) {
    return (
        <div className="space-y-6 h-full flex flex-col pb-8">

            {place.distance && (
                <div className="flex items-center justify-center gap-2 py-2 mb-2 bg-orange-50/50 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                        현재 위치에서 {Number(place.distance) < 1000
                            ? `${place.distance}m`
                            : `${(Number(place.distance) / 1000).toFixed(1)}km`}
                    </p>
                </div>
            )}

            <div className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-100">
                <iframe
                    src={place.place_url}
                    className="w-full h-full"
                    title="카카오맵 상세정보"
                />
            </div>


            <a
                href={place.phone ? `tel:${place.phone}` : '#'}
                onClick={(e) => !place.phone && e.preventDefault()}
                className={`w-full py-4 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-sm 
                            active:scale-[0.98] transition-all shadow-lg shadow-orange-200
                ${!place.phone && 'opacity-50 cursor-not-allowed'}
                `}
            >
                {place.phone ? `${place.place_name}에 전화걸기` : '등록된 번호가 없습니다'}
            </a>

            {/* //* 나중에 추가하기 */}
            {/* <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-sm active:scale-[0.98] transition-all shadow-lg shadow-orange-200">
                멍패스 사용하기
            </button> */}
        </div>
    )
}