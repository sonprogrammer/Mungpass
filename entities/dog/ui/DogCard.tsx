import { DogCardProps } from "@/entities/dog/model/types"
import { Pencil } from "lucide-react"
import Image from "next/image"


export function DogCard({ dog, onEdit }: DogCardProps) {
    if (!dog) {
        return (
            <div className="bg-white rounded-[2.5rem] p-6 border-2 border-dashed border-orange-100 flex items-center justify-between">
                <div>
                    <p className="text-lg font-bold text-slate-700">
                        강아지를 등록해주세요 
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                        우리 아이 정보를 등록하면 더 편해져요
                    </p>
                </div>

                <button
                    onClick={onEdit}
                    className="px-4 py-2 rounded-full bg-orange-400 text-white text-sm font-semibold cursor-pointer"
                >
                    등록
                </button>
            
            </div>
        )
    }

    return (
        <div className="bg-white rounded-[2.5rem] p-6 border border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-50">
                    <Image
                    // TODO 임시데이터로 해논거라 바꿔나야함, 이건 애견이 여러마리일수도 있어서 배열로 둠
                        src={dog[0].imageUrl || "/dog-default.png"}
                        alt={dog[0].name}
                        width={64}
                        height={64}
                    />
                </div>

                <div>
                    <p className="text-lg font-black text-slate-800">
                        {dog[0].name}
                    </p>
                    <p className="text-sm text-slate-500">
                        몸무게 {dog[0].weight}kg
                    </p>
                </div>
            </div>

            <button
                onClick={onEdit}
                className="p-2 rounded-full hover:bg-orange-50"
            >
                <Pencil className="w-5 h-5 text-orange-400" />
            </button>
        </div>
    )
}