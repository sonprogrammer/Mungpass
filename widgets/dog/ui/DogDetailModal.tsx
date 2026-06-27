'use client'

import { useDogStore } from "@/entities/dog/model"
import { useUserStore } from "@/entities/user/model"
import { useImageUpload } from "@/features/dog/lib"
import { DogDetailModalProps, DogRegisterForm, useDeleteDog, useGetMyDogs, useRegisterPrimaryDog, useUpdateMyDogs } from "@/features/dog/model"
import { DogFormFields } from "@/features/dog/ui"
import { ConfirmModal } from "@/shared/ui"
import { DogInfoView } from "@/widgets/dog/ui"
import { Ellipsis, X } from "lucide-react"
import { useCallback, useState } from "react"


export function DogDetailModal({ isOpen, onClose, directEditMode }: DogDetailModalProps) {
    const [isEdit, setIsEdit] = useState<boolean>(!!directEditMode)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    // * 삭제 획인 모달
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const profile = useUserStore(state => state.profile)

    const selectedDog = useDogStore(state => state.selectedDog)
    const { data: dogs } = useGetMyDogs()
    const dog = dogs?.find(dog => dog.id === selectedDog?.id)
    const [localFormData, setLocalFormData] = useState<DogRegisterForm | null>(dog ? {
        name: dog.name,
        breed: dog.breed,
        weight: dog.weight,
        description: dog.description || '',
        birth_date: dog.birth_date,
        image_url: dog.image_url
    } : null)

    // TODO 쓸모가 없으머
    const { imagePreview, imageFile, fileInputRef, handleImageChange } = useImageUpload(dog?.image_url)
    const { mutate: updatedMutate } = useUpdateMyDogs()
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteDog()
    const { mutate: primaryMutate } = useRegisterPrimaryDog(profile?.id || '')

    const hanldeTogglePrimary = useCallback(() => {
        if (!dog?.id || !profile?.id) return
        primaryMutate({ dogId: dog.id, userId: profile.id, currentPrimary: !!dog.is_primary })
    }, [dog, profile, primaryMutate])


    if (!isOpen || !localFormData) return null

    const handleEdit = () => {
        if (!dog?.id || !profile?.id) return
        setIsEdit(false)
        if (!dog?.id || !profile?.id || !dog) {
            alert("데이터를 불러오는 중입니다.");
            return;
        }
        updatedMutate({
            dogId: dog?.id, imageFile, formData: {
                ...localFormData,
                image_url: (imageFile ? imagePreview : dog.image_url) ?? undefined
            },
            userId: profile?.id
        })

    }



    const handleCheckDelete = () => {
        setIsDropdownOpen(false)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = () => {
        if (!dog || !profile) return null

        deleteMutate({
            dogId: dog.id,
        })
        onClose()
        setIsDropdownOpen(false)
    }



    return (
        <div className="fixed h-full inset-0 z-100 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => { onClose(); setIsEdit(false) }}
        >
            <div className="w-full max-w-120 bg-white rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-end items-center p-8 pb-4">

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
                            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                                <X className="w-6 h-6" />
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
                                                handleCheckDelete()
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

                    {isEdit && localFormData && dog ? (
                        <DogFormFields
                            formData={localFormData}
                            setFormData={setLocalFormData}
                            imagePreview={imagePreview}
                            onImageChange={handleImageChange}
                            fileInputRef={fileInputRef}
                        />
                    ) :
                        (
                            <DogInfoView
                                dog={dog}
                                onTogglePrimary={hanldeTogglePrimary}
                            />
                         
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

            <ConfirmModal
                open={isDeleteModalOpen}
                title='정보 삭제'
                description={`${selectedDog?.name}의 모든 기록을 삭제 하시겠습니까?`}
                confirmText='삭제'
                cancelText='취소'
                confirmDanger={true}
                isLoading={isDeleting}
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />

        </div >
    )
}