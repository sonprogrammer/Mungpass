'use client'

import { AlertCircle, ChevronLeft, X, Pencil, Plus, Settings2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DogProfileCard } from "@/entities/dog/ui/DogProfileCard";
import { useGetMyDogs } from "@/features/dog/model/useGetMyDogs";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { Dog, useDogStore } from "@/entities/dog/model/types";
import { DogFormModal } from "@/features/dog/ui/DogFormModal";
import { DogDetailModal } from "@/widgets/dog/ui/DogDetailModal";

import { useDeleteDog } from "@/features/dog/model/useDeleteDog";


export default function MyPetsPage() {
    const profile = useUserStore(state => state.profile)
    const setSelectedDog = useDogStore(state => state.setSelectedDog)
    const selectedDog = useDogStore(state => state.selectedDog)
    const { data: dogs, isPending } = useGetMyDogs(profile?.id)
    const router = useRouter();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [dogPostModalOpen, setDogPostModalOpen] = useState<boolean>(false)
    const [dogViewModalOpen, setDogViewModalOpen] = useState<boolean>(false)
    const [isDirectEdit, setIsDirectEdit] = useState<boolean>(false)

    const { mutate: deleteMutate } = useDeleteDog()

    const primaryDogStatus = !!dogs?.find(dog => dog.is_primary)


    const handleDelete = () => {
        if (!profile || !dogs || !selectedDog) return null

        deleteMutate({
            dogId: selectedDog.id,
            userId: profile.id
        })
        setSelectedDog(null)
        setIsEdit(false)
        // TODO alert주기
    }

    const handleViewDetail = (dog: Dog) => {
        setSelectedDog(dog)
        setIsDirectEdit(false)
        setDogViewModalOpen(true)
    }

    const handleEdit = (dog: Dog) => {
        setSelectedDog(dog)
        setIsDirectEdit(true)
        setDogViewModalOpen(true)
    }

    return (
        <main className="h-screen bg-[#FFFAF0] p-6 ">
            <header className="flex justify-between items-center mb-10">
                <button onClick={() => router.back()}
                    className="p-3 bg-white rounded-2xl shadow-sm hover:shadow-md acitve: scale-95 transition-all -ml-2 cursor-pointer"
                >
                    <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
                <h1 className="text-2xl font-black  text-slate-800 tracking-tight">MY PETS</h1>

                    <button
                    onClick={() => setIsEdit(!isEdit)}
                    className={`p-3 rounded-2xl transition-all active:scale-95 cursor-pointer 
                        ${dogs && dogs?.length > 0 ? '' : 'opacity-0 pointer-events-none'}
                        ${isEdit ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                            : 'bg-white text-slate-400 shadow-sm hover:text-slate-600'
                            }`}
                            >
                    {isEdit ? <X className="w-5 h-5" /> : <Settings2 className="w-5 h-5" />}
                </button>
            </header>
            {!primaryDogStatus && dogs && dogs.length > 0 && (
                <div className="mb-4 flex items-center justify-end gap-2 text-orange-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-tight">대표 강아지를 등록해 주세요</span>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3">
                <AnimatePresence mode="popLayout">
                    {dogs && dogs.map((dog, index) => (
                        <motion.div
                            key={dog.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                            onClick={() => handleViewDetail(dog)}
                        >
                            <DogProfileCard dog={dog} />

                            {/*//* 삭제/ 수정 */}
                            <AnimatePresence>
                                {isEdit && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute inset-0 bg-black/10 backdrop-blur-[2px] rounded-2xl flex items-center justify-center gap-5 z-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() => { handleEdit(dog); console.log('hi') }}
                                            className="w-12 h-12 bg-slate-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                                            <Pencil className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="w-12 h-12 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                                            <Trash2 className="w-6 h-6" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {/*//* 하단 추가 버튼 */}
                {dogs && dogs.length > 0 && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className=" aspect-4/5 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-orange-100 rounded-[2.5rem] bg-white/50 text-orange-300 hover:bg-orange-50 hover:border-orange-200 transition-all group"
                        onClick={() => setDogPostModalOpen(true)}
                    >
                        <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black">추가하기</span>
                    </motion.button>
                )}
            </div>

            {/* //* 데이터 없을 시  */}
            {dogs?.length === 0 && !isPending && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] shadow-sm border border-orange-50">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-orange-200" />
                    </div>
                    <p className="text-slate-400 font-bold mb-6 text-center leading-relaxed">
                        등록된 아이가 없네요!<br />
                        새로운 가족을 등록해볼까요?
                    </p>
                    <button onClick={() => setDogPostModalOpen(true)} className="px-8 py-4 bg-orange-400 text-white font-black rounded-2xl shadow-lg shadow-orange-100">
                        지금 등록하기
                    </button>
                </div>
            )}


            <DogFormModal
                isOpen={dogPostModalOpen}
                onClose={() => setDogPostModalOpen(false)}
                profile={profile}
            />
            {dogViewModalOpen && selectedDog && (

                <DogDetailModal
                    key={selectedDog.id}
                    isOpen={dogViewModalOpen}
                    onClose={() => setDogViewModalOpen(false)}
                    directEditMode={isDirectEdit}
                />
            )}
        </main>
    )
}