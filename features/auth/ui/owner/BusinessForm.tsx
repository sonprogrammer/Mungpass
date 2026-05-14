// TODO 비즈니스 실제 이용하게 되면 국세청 api로 사업자 등록 확인후 사업자 등록증 업로드 2단계로 걸쳐서 승인하는 방식으로 하기

'use client'

import { DocsImgPreviewModal } from "@/entities/owner/re-store/ui/DocsImgPreviewModal"
import { getAdminUrl } from "@/features/admin/store/api/ownerDocs"
import { usePostOwnerDocs } from "@/features/auth/model/owner/usePostOwnerDocs"
import { useUpdateOwnerDocs } from "@/features/auth/model/owner/useUpdateOwnerDocs"
import { BusinessStoreSubmitInfo } from "@/features/auth/model/types"
import { BusinessBizImg } from "@/features/auth/ui/owner/BusinessBizImg"
import { App } from "antd"
import { Camera, FileText, Loader2, Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"


interface BusinessFormProps {
    storeInfo: BusinessStoreSubmitInfo;
    ownerId: string;
    isEdit: boolean
    initialBizNumber?: string;
    initialBizImg?: string
    registrationTableId?: string
}

export function BusinessForm({ storeInfo, ownerId, isEdit, initialBizNumber, initialBizImg, registrationTableId }: BusinessFormProps) {

    const [businessNumber, setBusinessNumber] = useState<string>(initialBizNumber ?? '')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>( null)
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        const loadingInitialImage = async () => {
            if(!initialBizImg) return

            if (initialBizImg.startsWith('http') || initialBizImg.startsWith('blob')) {
                setPreview(initialBizImg)
                return
            }

            try {
                const url = await getAdminUrl(initialBizImg)
                if (url) setPreview(url)
                
            } catch (error) {
                console.error('이미지로드 실패', error)
            }
        }
        loadingInitialImage()
    }, [initialBizImg])

    // * 첫제출
    const { mutate: postOwnerDocs, isPending: postPending } = usePostOwnerDocs()
    // * 재 제출
    const { mutate: updateOwnerDocs, isPending: updatePending } = useUpdateOwnerDocs()

    const isPosting = postPending || updatePending

    const { message } = App.useApp()

    const formatBusinessNumber = (val: string) => {
        const number = val.replace(/[^0-9]/g, '')
        if (number.length <= 3) return number
        if (number.length <= 5) return `${number.slice(0, 3)}-${number.slice(3)}`
        return `${number.slice(0, 3)}-${number.slice(3, 5)}-${number.slice(5, 10)}`
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatBusinessNumber(e.target.value)
        if (formatted.length <= 12) setBusinessNumber(formatted)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            const url = URL.createObjectURL(selectedFile)
            setPreview(url)
        }
    }


    const removeFile = () => {
        setFile(null)
        setPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!ownerId) return message.error('회원 정보가 없습니다.')
        if (!storeInfo) return message.error('매장 정보가 확인되지 않습니다.')
        if (businessNumber.length !== 12) return message.error('사업자 번호를 확인해주세요.')
        // * 수정 모드 혹은 파일이 있으면 통과
        const canSubmit = isEdit ? (file || initialBizImg) : file
        if (!canSubmit) return message.error('사업자 등록증을 첨부해주세요.')

        if (isEdit) {
            if (!registrationTableId) {
                message.error('수정할 대상의 ID가 없습니다.')
                return
            } 
            updateOwnerDocs({
                id: registrationTableId,
                ownerId,
                storeInfo: storeInfo,
                businessNumber,
                DocsImg: (file || initialBizImg) as File | string
            })
        } else {
            postOwnerDocs({
                ownerId,
                storeInfo: storeInfo,
                businessNumber,
                DocsImg: file as File
            })
        }
    }

    const isValid = businessNumber.length === 12 && (file || (isEdit && initialBizImg))

    return (
        <>
            <form onSubmit={handleVerify} className="flex flex-col gap-6 mt-4 pb-6">
                <section className="space-y-3">
                    <label className="text-sm font-bold ml-1 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-orange-500" />
                        사업자 등록번호
                    </label>
                    <input
                        type="text"
                        value={businessNumber}
                        onChange={handleChange}
                        placeholder="000-00-00000"
                        className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 px-6 text-xl font-black tracking-widest focus:border-orange-500 focus:outline-none transition-all placeholder:text-slate-400"
                    />
                </section>

                {/* //*서류 업로드 */}
                <section className="space-y-3">
                    <label className="text-sm font-bold ml-1 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-orange-500" />
                        사업자 등록증 첨부
                    </label>

                    {!preview ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-3 bg-white hover:bg-orange-50/30 hover:border-orange-200 transition-all cursor-pointer group"
                        >
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-orange-400 group-hover:bg-white transition-all">
                                <Upload className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-slate-500">등록증 사진 업로드</p>
                                <p className="text-[11px] text-slate-400 mt-1">(최대 5MB)</p>
                            </div>
                        </div>
                    ) : (
                        <BusinessBizImg preview={preview} removeFile={removeFile} onOpenModal={() => setIsModalOpen(true)} />
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </section>

                <div className="bg-slate-50 rounded-2xl p-4 text-[11px] text-slate-400 leading-relaxed">
                    * 입력하신 번호는 가입 승인 및 서비스 이용을 위한 본인 확인 용도로만 사용됩니다.<br />
                    {/* //TODO 여기 승인 완료 후 30일 폐기인지 아님 즉시 폐긴지 생각하고 넣어놓기 */}
                    * 올려주신 사업자 등록증은 승인 완료후 폐기처리됩니다.<br />
                    * 허위 정보를 입력할 경우 가입 승인이 거절될 수 있습니다.
                </div>

                <button
                    disabled={!isValid || isPosting}
                    className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all cursor-pointer
                        ${isValid ? 'bg-slate-800 text-white active:scale-[0.98]' : 'bg-slate-200 text-slate-400 pointer-events-none shadow-none'}
                `}
                    type="submit"
                >

                    {isPosting ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={20} />
                            <span>처리중...</span>
                        </div>
                    ) :
                        isEdit ? <span>재 심사 요청</span> : <span>심사 요청</span>
                    }
                </button>

            </form>

            <DocsImgPreviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imgUrl={preview} />

        </>
    )
}