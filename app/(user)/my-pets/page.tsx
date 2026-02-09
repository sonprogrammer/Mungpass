'use client'

import { Dog } from "@/entities/dog/model/types";
import { DogCard } from "@/entities/dog/ui/DogCard";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyPetsPage() {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const router = useRouter()
    return (
        <main className="h-screen bg-[#FFFBEB] p-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-extrabold text-slate-800">우리 아이 관리</h1>

            </header>

            {dogs.length === 0 && (
                <div>
                    <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-orange-300 hover:bg-orange-500 border-2 border-dashed border-orange-400 hover:border-orange-500 transition-all duration-200 group">

                        <span className="text-2xl text-orange-500 group-hover:text-orange-600 font-bold">+</span>
                        <span className="text-[10px] text-orange-400 group-hover:text-orange-500 mt-1">등록하기</span>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {dogs.map(dog => (
                    <div key={dog.id} className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50">

                        {/* <DogCard dog={dog} onEdit={() => router.push(`/pet-edit/${dog.id}`)} /> */}


                        <div className="mt-4 pt-4 border-t border-dashed border-slate-100">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-500 font-medium">유치원 잔여 시간</span>
                                <span className="text-orange-500 font-bold">12시간 30분</span>
                            </div>

                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-orange-400 h-full w-2/3" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}