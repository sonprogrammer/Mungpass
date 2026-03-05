import { KakaoPlace } from "@/shared/model/map";

export function SelectedStore({place, onNext}: {place: KakaoPlace, onNext: () => void}) {
    return (
        <div className="px-6 z-30 animate-in slide-in-from-bottom-10">
            <div className="bg-white rounded-4xl shadow-2xl p-6 ">
                <div className="flex flex-col gap-3">
                    <div>
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-bold">
                            선택된 가게
                        </span>
                        <h3 className="text-xl font-black mt-1">{place.place_name}</h3>
                        <p className="text-sm text-slate-500">{place.road_address_name}</p>
                    </div>

                    <button
                        onClick={onNext}
                        className="w-full bg-orange-500 text-white py-3 rounded-2xl font-black text-lg shadow-orange-200 shadow-lg active:scale-95 transition-transform cursor-pointer"
                    >
                        이 장소로 등록 시작하기
                    </button>
                </div>
            </div>
        </div>
    )
}