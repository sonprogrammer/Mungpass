'use client'

import { DogFormModalProps, DogRegisterForm } from "@/features/dog/model/types"
import { useRegisterDog } from "@/features/dog/model/useRegisterDog"
import { DogFormFields } from "@/features/dog/ui/DogFormFields"
import { X } from "lucide-react"
import { useRef, useState } from "react"


export function DogFormModal({ isOpen, onClose, profile }: DogFormModalProps) {
    const [formData, setFormData] = useState<DogRegisterForm>({ name: '', breed: '', weight: '', description: '', birth_date: '' })
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // console.log('profile', profile)
    const { mutate, isPending } = useRegisterDog()


    if (!isOpen) {
        return null
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            setImageFile(file)
            reader.onload = () => setImagePreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!profile?.id){
            alert('로그인 정보가 없습니다. 다시 로그인해주세요. from dogRegisterModal.tsx')
            return
        }
        mutate({ formData: {...formData, weight: Number(formData.weight)}, image: imageFile, userId: profile.id }, {
            onSuccess: () => {
                alert('등록 성공')
                onClose()
                setFormData({ name: '', breed: '', weight: '', description: '', birth_date: '' })
                setImageFile(null)
                setImagePreview(null)
            }
        })
    }

    return (
        <div 
            className="fixed h-full inset-0 z-100 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => onClose()}
            >
            <div
                className="w-full h-[80%] overflow-y-auto max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* //*헤더 */}
                <div className="flex justify-between items-center p-6 border-b border-orange-50">
                    <h2 className="text-xl font-black text-slate-800">애완견 등록</h2>
                    <button
                        className="p-2 hover:bg-orange-50 rounded-full transition-color"
                        onClick={onClose}
                    >
                        <X className="w-6 h-6 " />
                    </button>
                </div>

                {/*//* 제출 폼 */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                  <DogFormFields 
                    formData={formData}
                    setFormData={setFormData}
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                    fileInputRef={fileInputRef}
                  />

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-orange-400 text-white font-black rounded-2xl hover:bg-orange-500 transition-transform active:scale-[0.98] shadow-lg shadow-orange-100"
                    >
                        {isPending ? '등록 중...' : '등록 하기'}
                    </button>
                </form>
            </div>
        </div>
    )
}