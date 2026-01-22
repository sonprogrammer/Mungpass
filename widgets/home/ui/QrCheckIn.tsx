import QrScannerModal from "@/features/qr/ui/QrScannerModal";
import { CheckCircle2, ChevronRight, Clock, PartyPopper, QrCode } from "lucide-react";
import { useState } from "react";

export function QrCheckIn() {
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

     // //*QR 스캔 성공 시 (입실 로직)
    const handleScanSuccess = (data: string) => {
        setIsScannerOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };
    return (
        <>
            <button
                onClick={() => setIsScannerOpen(true)}
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

            {/* QR성공시, //TODO 퇴실 한시간전 알림 추가 */}
            {
                showSuccess && (
                    <div className="fixed inset-0 z-2000 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
                        <div className="absolute inset-0 bg-orange-500/90 backdrop-blur-xl" />
                        <div className="relative bg-white rounded-[3rem] p-10 w-full max-w-xs text-center shadow-2xl border-4 border-orange-100">
                            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                <CheckCircle2 className="w-14 h-14 text-orange-500 animate-bounce" />
                                <PartyPopper className="absolute -right-2 -top-2 w-8 h-8 text-yellow-400 rotate-12" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">입실 완료!</h2>
                            <p className="text-slate-500 font-medium mb-6 text-sm">
                                사장님께 초코의 정보를<br />안전하게 전달했어요. 🐾
                            </p>
                            <div className="flex items-center justify-center gap-2 text-orange-600 font-black bg-orange-50 py-4 rounded-3xl">
                                <Clock className="w-5 h-5" />
                                <span>이용 시간 측정 시작</span>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* 스캐너 모달 연결 */}
            {
                isScannerOpen && (
                    <QrScannerModal
                        onClose={() => setIsScannerOpen(false)}
                        onScanSuccess={handleScanSuccess}
                    />
                )
            }
        </>
    )
}