'use client'

import { Dog } from "@/entities/dog/model";
import { usePostCheckIn } from "@/features/qr/model";
import { QrScannerModal } from "@/features/qr/ui";
import { DogSelectStep } from "@/features/user-checkin/ui";
import { App } from "antd";
import { CheckCircle2, ChevronRight, Clock, PartyPopper, QrCode } from "lucide-react";
import { useState } from "react";

export function QrCheckIn({dogs, isDogsPending}: {dogs: Dog[], isDogsPending: boolean}) {
    const [step, setStep] = useState<'IDLE' | 'SELECT_DOG' | 'SCANNING' | 'SUCCESS'>('IDLE')
    const [selectedDog, setSelectedDog] = useState<Dog | null>(null)

    const { mutate: checkIn, isPending: isCheckInPending} = usePostCheckIn()

    const {message} = App.useApp()

    
    // * 이용할 펫 선택
    const handleDogSelect = (dog: Dog) => {
        setSelectedDog(dog)
        setStep('SCANNING')
    }

     // //*QR 스캔 성공 시 (입실 로직)
    const handleScanSuccess = (data: string) => {
        if(!selectedDog || isCheckInPending) return

        const url = new URL(data.startsWith('http') ? data : `http://${data}`)
        const params = new URLSearchParams(url.search)
        const shopId = params.get('shopId')
        const productId = params.get('productId')

        if(!shopId || !productId){
            message.error('잘못된 QR코드입니다. 다시 시도해주세요')
            return
        }

        checkIn({dogId: selectedDog.id, shopId, productId},{
            onSuccess: () => {
                message.success(`${selectedDog.name} 입실 완료`)
                setStep('SUCCESS')
                setTimeout(() => {
                    setStep('IDLE')
                    setSelectedDog(null)
                }, 3000)
            },
            onError: (error) => {
                message.error(error.message || '입실 처리에 실패했습니다. 다시 시도해주세요')
                setStep('IDLE')
            }
        })
        
    }

    const closeModal = () => {
        setStep('IDLE')
        setSelectedDog(null)
    }
    return (
        <>
            <button
                onClick={() => setStep('SELECT_DOG')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between group transition-all active:scale-95"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-orange-500 p-4 rounded-3xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/30">
                        <QrCode className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                        <p className="font-extrabold text-lg tracking-tight">지금 입실하기</p>
                        <p className="text-white/50 text-xs">QR 스캔으로 이용권을 시작하세요</p>
                    </div>
                </div>
                <ChevronRight className="w-6 h-6 text-white/30" />
            </button>

            <DogSelectStep 
                open={step === 'SELECT_DOG'}
                onClose={closeModal}
                dogs={dogs}
                isDogsPending={isDogsPending}
                onSelect={handleDogSelect}
            />

            {/* //*스캐너 모달 */}
            {step === 'SCANNING' && (
                <QrScannerModal
                    onClose={closeModal}
                    onScanSuccess={handleScanSuccess}
                />
            )}

            {step === 'SUCCESS' && (
                <div className="fixed h-screen inset-0 z-2000 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
                    <div className="absolute inset-0 backdrop-blur-xl" />
                    <div className="relative bg-white rounded-[3rem] p-10 w-full max-w-xs text-center shadow-2xl border-4 border-orange-100">
                        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <CheckCircle2 className="w-14 h-14 text-orange-500 animate-bounce" />
                            <PartyPopper className="absolute -right-2 -top-2 w-8 h-8 text-yellow-400 rotate-12" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">{selectedDog?.name} 입실 완료!</h2>
                        <p className="text-slate-500 font-medium mb-6 text-sm leading-relaxed">
                            사장님께 정보를 안전하게 전달했어요.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-orange-600 font-black bg-orange-50 py-4 px-2 rounded-3xl">
                            <Clock className="w-5 h-5" />
                            <span>실시간 이용을 확인할 수 있어요</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}