'use client';

import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';

export default function QrScannerModal({ onClose, onScanSuccess }: { 
  onClose: () => void, 
  onScanSuccess: (data: string) => void 
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isInitialized = useRef(false); //  초기화 여부 체크용ㅇ

  useEffect(() => {
    // 이미 초기화 중이라면 중복 실행 방지
    if (isInitialized.current) return;
    
    const scannerId = "reader";
    const html5QrCode = new Html5Qrcode(scannerId);
    scannerRef.current = html5QrCode;
    isInitialized.current = true;

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: (viewWidth, viewHeight) => {
              const minEdge = Math.min(viewWidth, viewHeight);
              return { width: minEdge * 0.7, height: minEdge * 0.7 };
            },
          },
          (decodedText) => {
            if (navigator.vibrate) navigator.vibrate(100);
            onScanSuccess(decodedText);
          },
          () => {} 
        );
      } catch (err) {
        console.error("카메라 시작 에러:", err);
        // 권한 문제 등이 있을 때만 에러
        if (!err?.toString().includes("Already scanning")) {
            alert("카메라를 켤 수 없습니다.");
            onClose();
        }
      }
    };

    startScanner();


    return () => {
      isInitialized.current = false;
      if (scannerRef.current) {
        // 스캔 중이라면 멈추고 객체 정리
        if (scannerRef.current.isScanning) {
          scannerRef.current.stop()
            .then(() => {
              scannerRef.current?.clear();
            })
            .catch(err => console.error("Scanner stop failed", err));
        }
      }
    };
  }, [onScanSuccess, onClose]);

  return (
    <div className="fixed inset-0 z-[1000] h-[100dvh] w-screen bg-black flex flex-col items-center justify-center overflow-hidden">
  
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-[1001] p-3 bg-white/10 rounded-full text-white backdrop-blur-md active:scale-95"
      >
        <X className="w-6 h-6" />
      </button>

      {/* //*가이드 문구 */}
      <div className="absolute top-20 text-center z-[1001] pointer-events-none">
        <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
        <h3 className="text-white font-bold text-lg">QR 코드 스캔</h3>
        <p className="text-white/60 text-sm mt-1 px-6">사각형 안에 QR 코드를 맞춰주세요</p>
      </div>

      {/* //*카메라*/}
      <div id="reader" className="w-full h-full [&>video]:w-full [&>video]:h-full [&>video]:object-cover" />

      {/* //*스캔 가이드 라인 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-[1001]">
        <div className="w-64 h-64 border-2 border-white/20 rounded-3xl relative">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg" />
          <div className="absolute inset-0 border border-blue-500/30 rounded-3xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}