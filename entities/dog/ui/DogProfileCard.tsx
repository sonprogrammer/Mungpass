// * 마이펫페이지에서 나오는 강아지 프로필 카드

import { Dog } from "@/entities/dog/model/types";
import dayjs from "dayjs";
import { Cake, Dog as Dogicon } from "lucide-react";

export function DogProfileCard({ dog }: { dog: Dog }) {
    const date = dayjs(dog.birth_date)

    return (
        <div className="group w-full bg-white border border-orange-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-2xl">
            <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-4xl bg-orange-50">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={dog.image_url || './icon.png'} alt="강아지 프로필 사진" />
                {dog.is_primary && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md">
                        대표 강아지
                    </div>
                )}
            </div>
            <div className="space-y-3 px-1">
                <div className="flex items-end justify-between">
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">
                        {dog.name}
                    </h1>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-50 px-2 py-0.5 rounded-lg">
                        {dog.breed}
                    </span>
                </div>

                <div className="h-px bg-slate-50 w-full" />

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <Dogicon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-bold">{dog.weight}kg</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <Cake className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-bold">{date.format('YY.MM-DD')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}