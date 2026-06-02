'use client'

import { BusinessBizImgProps } from '@/features/auth/model'
import { CheckCircle2, Maximize2, X } from 'lucide-react'
import NextImage from 'next/image'


export function BusinessBizImg({ preview, removeFile, onOpenModal }: BusinessBizImgProps) {


    return (
        <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500 shadow-lg">
            <NextImage src={preview} alt="등록증 미리보기" className="w-full h-48 object-cover" width={500} height={200} />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                    onClick={removeFile}
                    className="bg-white text-red-500 p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
                    title='삭제'
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity">

                <button
                    type="button"
                    onClick={onOpenModal}
                    className="bg-white text-orange-500 p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
                    title="확대하기"
                >
                    <Maximize2 className="w-6 h-6" />
                </button>


                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        removeFile()
                    }}
                    className="bg-white text-red-500 p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
                    title="삭제"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="absolute bottom-3 right-3 bg-orange-500 text-white text-[10px] font-black px-2 py-2 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>기존 서류 로드됨</span>
            </div>
        </div>
    )
}