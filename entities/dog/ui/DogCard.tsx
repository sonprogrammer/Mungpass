// *마이도그위젯에서 나오는 카드

import { getDogAge } from "@/entities/dog/lib/getDogAge"
import { Dog } from "@/entities/dog/model/types"
import dayjs from "dayjs"
import { ChevronRight, ChessQueen } from "lucide-react"


export function DogCard({ dog }: { dog: Dog}) {



    return (

        <div className="bg-white rounded-[2.5rem] p-6 border border-orange-100 flex items-center justify-between group hover:shadow-md" >
            <div className="flex items-center gap-4 relative" >
                <div className=" w-16 h-16 rounded-full overflow-hidden bg-orange-50">
                    {/* //TODO 만약 대표 애견이면 왕관 나오게 */}
                    {dog.is_primary &&
                        <div className="absolute -top-1.5 -left-1.5 rounded-full p-1 shadow-sm">
                            <ChessQueen className="w-4 h-4 text-yellow-500 -rotate-20 fill-yellow-500" />
                        </div>
                    }
                    <img
                        src={dog.image_url || "/icon.png"}
                        alt={'강아지 프로필 사진'}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <div className="flex items-center gap-1">
                        <p className="text-lg font-black text-slate-800">
                            {dog.name}
                        </p>
                        <span className="text-[11px] font-bold text-orange-500">
                            {getDogAge(dog.birth_date)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded-full">
                            생일 : {dog.birth_date ? dayjs(dog.birth_date).format('M월 DD일') : '-'}
                        </span>
                        <p className="text-sm text-slate-500">
                            {dog.weight}kg
                        </p>
                    </div>
                </div>
            </div>

            <button
                className="p-2 cursor-pointer rounded-full hover:bg-orange-100 group bg-orange-50 transition-colors"
            >
                <ChevronRight className="w-6 h-6 text-orange-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    )
}