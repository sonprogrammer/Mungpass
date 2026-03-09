// TODO 비즈니스 실제 이용하게 되면 국세청 api로 사업자 등록 확인후 사업자 등록증 업로드 2단계로 걸쳐서 승인하는 방식으로 하기

'use client'

import { usePostOwnerDocs } from "@/features/auth/model/owner/usePostOwnerDocs"
import { KakaoPlace } from "@/shared/model/map"
import { Camera, CheckCircle2, FileText, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export function BusinessForm({ storeInfo,ownerId }: { storeInfo: KakaoPlace | null, ownerId: string | null }) {
    const router = useRouter()
    const [businessNumber, setBusinessNumber] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)


    console.log('storeinfo from business', storeInfo)
    console.log('storeinfo from business',ownerId)

    const { mutate:postOwnerDocs, isPending} = usePostOwnerDocs()
    

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
        if(!ownerId) return alert('회원 정보가 없습니다. - 이럴 순 없음')
        if(!storeInfo) return alert('등록지점 정보가 없습니다. - 그럴수 없음 만약 그래도 auth/page에서 뒤로가기 진행시켜놈')
        if (businessNumber.length !== 12) return alert('사업자 번호를 확인해주세요.')
        if(!file) return alert('사업자 등록증을 첨부해주세요.')


        postOwnerDocs({
            ownerId,
            storeInfo,
            businessNumber,
            DocsImg: file
        })
    }

    return (
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
                    <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500 shadow-lg">
                        <img src={preview} alt="등록증 미리보기" className="w-full h-48 object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                                onClick={removeFile}
                                className="bg-white text-red-500 p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-orange-500 text-white text-[10px] font-black px-2 py-2 rounded-md flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                        </div>
                    </div>
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
                * 올려주신 사업자 등록증은 승인 완료후 폐기처리됩니다.<br />
                * 허위 정보를 입력할 경우 가입 승인이 거절될 수 있습니다.
            </div>

            <button
                disabled={businessNumber.length !== 12 || !file || isPending}
                className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all cursor-pointer
                        ${businessNumber.length === 12 && file
                        ? 'bg-slate-800 text-white active:scale-[0.98]'
                        : 'bg-slate-200 text-slate-400 pointer-events-none shadow-none'}
                            `}
                type="submit"
            >
                {isPending ? '처리중' : '심사 요청하기'}
            </button>

        </form>
    )
}