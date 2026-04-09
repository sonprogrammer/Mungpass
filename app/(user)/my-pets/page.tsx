'use client'

import { AlertCircle, X, Pencil, Plus, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DogProfileCard } from "@/entities/dog/ui/DogProfileCard";
import { useGetMyDogs } from "@/features/dog/model/useGetMyDogs";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { Dog, useDogStore } from "@/entities/dog/model/types";
import { DogFormModal } from "@/features/dog/ui/DogFormModal";
import { DogDetailModal } from "@/widgets/dog/ui/DogDetailModal";

import { useDeleteDog } from "@/features/dog/model/useDeleteDog";
import { useGetMyPetUsage } from "@/features/qr/model/useGetMyPetUsage";
import { LiveUsageCard } from "@/widgets/dog/ui/LiveUsageCard";
import { UsageStoryList } from "@/entities/check-in/ui/UsageStoryList";
import { MyPetUsageAllInfo } from "@/features/qr/model/types";

export default function MyPetsPage() {
    const profile = useUserStore(state => state.profile)
    const setSelectedDog = useDogStore(state => state.setSelectedDog)
    const selectedDog = useDogStore(state => state.selectedDog)

    const [isEdit, setIsEdit] = useState<boolean>(false)
    // * 강아지 등록 모달
    const [dogPostModalOpen, setDogPostModalOpen] = useState<boolean>(false)
    // *강아지 상세 모달
    const [dogViewModalOpen, setDogViewModalOpen] = useState<boolean>(false)
    // * 체크인한 강아지 상세모달
    const [activeDogModalOpen, setActiveDogModalOpen] = useState(false)
    // * 체크인한 강아지 상세모달에 보낼 강아지 데이터
    const [selectedDogUsage, setSelectedDogUsage] = useState<MyPetUsageAllInfo | null>(null)
    // * 바로 수정 하기
    const [isDirectEdit, setIsDirectEdit] = useState<boolean>(false)

    const { data: dogs, isPending } = useGetMyDogs()
    const { mutate: deleteMutate } = useDeleteDog()
    const { data: activeDogs = [] } = useGetMyPetUsage({ statuses: ['staying'] })

    const primaryDogStatus = !!dogs?.find(dog => dog.is_primary)

    console.log(' activedog', activeDogs)

    // TODO 삭제 확인 로직 짜기
    const handleDelete = () => {
        if (!profile || !dogs || !selectedDog) return null

        deleteMutate({
            dogId: selectedDog.id,
            userId: profile.id
        })
        setSelectedDog(null)
        setIsEdit(false)
        // TODO message.error해주기
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

    const handleDogClick = (usageDog: MyPetUsageAllInfo) => {
        setSelectedDogUsage(usageDog)
        setActiveDogModalOpen(true)
    }

    return (
        <main className="h-screen p-6 w-full space-y-2 relative">
            <header className={`flex justify-center items-center ${activeDogs.length > 0 ? '' : 'mb-10'}`}>
                <h1 className="text-2xl font-black  text-slate-800 tracking-tight">MY PETS</h1>

                <button
                    onClick={() => setIsEdit(!isEdit)}
                    className={`absolute right-5 top-5 p-3 rounded-2xl transition-all active:scale-95 cursor-pointer 
                        ${dogs && dogs?.length > 0 ? '' : 'opacity-0 pointer-events-none'}
                        ${isEdit ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                            : 'bg-white text-slate-400 shadow-sm hover:text-slate-600'
                        }`}
                >
                    {isEdit ? <X className="w-5 h-5" /> : <Settings2 className="w-5 h-5" />}
                </button>
            </header>
 
            {activeDogs.length > 0 && (
                <section className="border-b-2 border-slate-200">
                    <h2 className="text-xs font-black text-slate-400 mb-1 px-2 tracking-widest uppercase">Checked-In</h2>
                    <div className="flex gap-4 overflow-x-auto py-2 px-2 no-scrollbar scroll-smooth">
                        {activeDogs.map(usage => (
                            <UsageStoryList
                                key={usage.id}
                                usageDog={usage}
                                onClick={() => handleDogClick(usage)}
                            />
                        ))}
                    </div>
                </section>
            )}

            {!primaryDogStatus && dogs && dogs.length > 0 && (
                <div className="mb-4 flex items-center justify-end gap-2 text-orange-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-tight">대표 강아지를 등록해 주세요</span>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 ">
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

            {/* //* 현재 이용중인 강아지 스로리에서 강아지 클릭시 디테일 데이토ㅓ  */}
            <AnimatePresence>
                {activeDogModalOpen && selectedDogUsage && (
                    <div 
                        className="fixed inset-0 z-2000 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setActiveDogModalOpen(false)} 
                    >
                        <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full max-w-120 mb-10 pointer-events-auto"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <LiveUsageCard dogUsage={selectedDogUsage} />
                            
                            <button 
                                onClick={() => setActiveDogModalOpen(false)}
                                className="mt-4 w-full py-4 bg-white/20 text-white font-black rounded-3xl border border-white/30 backdrop-blur-md"
                            >
                                닫기
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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