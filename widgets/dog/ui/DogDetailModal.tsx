'use client'

import { useDogStore } from "@/entities/dog/model/types"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { useImageUpload } from "@/features/dog/lib/useImageUpload"
import { DogDetailModalProps } from "@/features/dog/model/types"
import { useUpdateMyDogs } from "@/features/dog/model/useUpdateMyDogs"
import { DogFormFields } from "@/features/dog/ui/DogFormFields"
import dayjs from "dayjs"
import { Ellipsis, X } from "lucide-react"
import { useEffect, useState } from "react"
import { getDogAge } from "@/entities/dog/lib/getDogAge"
import { useDeleteDog } from "@/features/dog/model/useDeleteDog"

export function DogDetailModal({ dog, isOpen, onClose, directEditMode }: DogDetailModalProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const setSelectedDog = useDogStore(state => state.setSelectedDog)
    const profile = useUserStore(state => state.profile)
    console.log('profile', profile)

    const { imagePreview, imageFile, fileInputRef, handleImageChange } = useImageUpload(dog?.image_url)
    const { mutate: updatedMutate } = useUpdateMyDogs()
    const { mutate: deleteMutate} = useDeleteDog()

    const [prevOpen, setPrevOpen] = useState(isOpen)

    if (isOpen !== prevOpen) {
        setPrevOpen(isOpen);
        if (isOpen) {
            setIsEdit(!!directEditMode); 
        }
    }

    console.log('detailmodal', dog)
    if (!isOpen) return null

    const handleEdit = () => {
        setIsEdit(false)
        if (!dog?.id || !profile?.id || !dog) {
            alert("데이터를 불러오는 중입니다.");
            return;
        }
        updatedMutate({
            dogId: dog?.id, imageFile, formData: {
                name: dog?.name,
                breed: dog?.breed,
                weight: dog?.weight,
                description: dog?.description,
                birth_date: dog?.birth_date,
            }, userId: profile?.id
        })

        if (imagePreview) {
            setSelectedDog({
                ...dog,
                image_url: imagePreview
            })
        }
    }

    const handleDelete = () => {
        if(!dog || !profile) return null

        deleteMutate({
            dogId: dog.id,
            userId: profile.id
        })
        onClose()
        setIsDropdownOpen(false)
    }

    return (
        <div className="fixed h-screen inset-0 z-100 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => { onClose(); setIsEdit(false) }}
        >
            <div className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-between items-center p-8 pb-4">
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                        <X className="w-6 h-6" />
                    </button>

                    {isEdit ? (
                        <button onClick={() => setIsEdit(false)} className="text-sm font-bold text-slate-400 underline underline-offset-4">
                            취소
                        </button>
                    ) : (
                        <div className="relative">

                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`p-2 hover:bg-orange-50 rounded-full text-slate-400 ${isDropdownOpen ? 'bg-orange-100 text-orange-500' : 'hover:bg-orange-50 text-slate-400'}`}
                            >
                                <Ellipsis className="w-6 h-6" />
                            </button>

                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-150 origin-top-right">
                                            <button
                                                onClick={() => {
                                                    setIsEdit(true);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDelete()
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                삭제하기
                                            </button>
                                        </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-8 pt-0 space-y-6 max-h-[70vh] overflow-y-auto">

                    {isEdit && dog ? (
                        <DogFormFields
                            formData={{
                                name: dog.name,
                                breed: dog.breed,
                                weight: dog.weight,
                                birth_date: dog.birth_date,
                                description: dog.description,
                                image_url: dog.image_url
                            }}
                            setFormData={(newData) => {
                                setSelectedDog({
                                    ...dog,
                                    ...newData,
                                    weight: isNaN(Number(newData.weight)) ? dog.weight : Number(newData.weight)
                                });
                            }}
                            imagePreview={imagePreview}
                            onImageChange={(e) => {
                                handleImageChange(e)
                                const file = e.target.files?.[0]
                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = () => {
                                        const preiviewUrl = reader.result as string
                                        setSelectedDog({ ...dog, image_url: preiviewUrl })
                                    }
                                }
                            }}
                            // onImageChange={handleImageChange}
                            fileInputRef={fileInputRef}
                        />
                    ) :
                        (
                            <>
                                <div className="flex items-center gap-5 mb-6">
                                    {/* //* 강아지 사진 */}
                                    <div className="relative w-20 h-20 rounded-[1.8rem] bg-orange-50 overflow-hidden shadow-inner shrink-0">
                                        <img src={dog?.image_url || "/icon.png"} className="w-full h-full object-cover" />
                                    </div>

                                    {/* //*이름  나이 */}
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                                                {dog?.name || '이름 없음'}
                                            </h1>
                                            {dog?.birth_date && (
                                                <span className="text-sm font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg">
                                                    {getDogAge(dog.birth_date)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 ml-0.5 uppercase tracking-wider">Pet Profile</p>
                                    </div>
                                </div>

                                {/* //*품종 몸무게 생일 */}
                                <div className="grid grid-cols-3 gap-3 mb-6 bg-white border border-slate-50 p-4 rounded-4xl shadow-sm">
                                    <div className="flex flex-col items-center border-r border-slate-50">
                                        <label className="text-[10px] font-black text-slate-300 mb-1">품종</label>
                                        <p className="text-sm font-bold text-slate-700 truncate w-full text-center px-1">
                                            {dog?.breed || '-'}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center border-r border-slate-50">
                                        <label className="text-[10px] font-black text-slate-300 mb-1">몸무게</label>
                                        <p className="text-sm font-bold text-slate-700">
                                            {dog?.weight ? `${dog.weight}kg` : '-'}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <label className="text-[10px] font-black text-slate-300 mb-1">생일</label>
                                        <p className="text-sm font-bold text-slate-700">
                                            {dog?.birth_date ? dayjs(dog.birth_date).format('YY.MM.DD') : '-'}
                                        </p>
                                    </div>
                                </div>

                                {/* //* 특이사항 */}
                                <div>
                                    <label className="text-xs font-black text-slate-400 ml-1 mb-2 block uppercase tracking-tighter">Memory / Note</label>
                                    <div className="relative">
                                        <span className="absolute -top-2 left-3 text-2xl text-orange-200 font-serif">“</span>
                                        <p className="text-[13px] text-slate-500 leading-relaxed px-6 py-4 bg-orange-50/30 rounded-2xl italic">
                                            {dog?.description || '아직 작성된 특징이 없습니다.'}
                                        </p>
                                        <span className="absolute -bottom-5 right-3 text-2xl text-orange-200 font-serif">”</span>
                                    </div>
                                </div>
                            </>
                        )}

                    {isEdit && (
                        <button
                            onClick={handleEdit}
                            className="w-full py-5 bg-orange-400 text-white font-black rounded-3xl shadow-lg shadow-orange-100 animate-in slide-in-from-bottom-2">
                            변경사항 저장하기
                        </button>
                    )}
                </div>


            </div>

        </div >
    )
}