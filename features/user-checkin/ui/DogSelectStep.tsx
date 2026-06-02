'use client'

import { Dog } from "@/entities/dog/model";
import { Avatar, Modal, Spin } from "antd"
import { ChevronRight, DogIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface DogSelecStepProps {
    open: boolean;
    onClose: () => void;
    dogs: Dog[]
    isDogsPending: boolean
    onSelect: (dog: Dog) => void
}

export function DogSelectStep({ open, onClose, dogs, isDogsPending, onSelect }: DogSelecStepProps) {
    const router = useRouter()

    return (
        <Modal open={open} onCancel={onClose} footer={null} centered
            width={400}
            title={
                <div className="pt-4 px-2">
                    <h1 className="text-xl font-bold text-slate-900">어떤 아이가 입실하나요?</h1>
                    <p className="text-slate-400 text-sm font-normal mt-1">입실할 강아지를 선택해주세요.</p>
                </div>
            }

        >
            {isDogsPending ? (
                <div className="flex-1 flex items-center justify-center">
                    <Spin size="large" />
                    <p className="text-slate-400 animate-pulse">강아지 정보를 불러오는 중...</p>
                </div>
            ) : dogs.length > 0 ? (
                <div className="flex flex-col gap-3 mt-4">
                    {dogs.map((dog) => (
                        <button
                            key={dog.id}
                            onClick={() => onSelect(dog)}
                            className=" cursor-pointer flex items-center justify-between p-4 rounded-3xl bg-slate-50 hover:bg-orange-50 border-2 border-transparent hover:border-orange-100 transition-all group active:scale-95"
                        >
                            <div className="flex items-center gap-4">
                                <Avatar
                                    size={54}
                                    src={dog.image_url}
                                    icon={<DogIcon className="text-slate-300" />}
                                    className="border-2 border-white shadow-sm shrink-0"
                                />
                                <div className="text-left">
                                    <h3 className="font-bold text-slate-800 text-base">{dog.name}</h3>
                                    <p className="text-xs text-slate-500">{dog.breed} · {dog.weight}kg</p>
                                </div>
                            </div>
                            <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-orange-500 transition-colors">
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white" />
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <p className="text-slate-400 text-sm">등록된 강아지 정보가 없습니다.</p>
                    <p className="text-slate-400 text-sm">애완견을 먼저 등록해주세요.</p>
                    <button 
                        className="px-8 py-4 mt-5 cursor-pointer bg-orange-400 text-white font-black rounded-2xl shadow-lg shadow-orange-100"
                        onClick={() => router.push('/my-pets')}
                    >
                        등록하러 가기
                    </button>
                </div>
            )
            }
        </Modal>
    )
}