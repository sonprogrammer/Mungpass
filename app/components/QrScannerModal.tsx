'use client';

import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode'; // Scanner 대신 더 세밀한 제어가 가능한 Html5Qrcode 사용
import { X, Camera } from 'lucide-react';

export default function QrScannerModal({ onClose, onScanSuccess }: { 
  onClose: () => void, 
  onScanSuccess: (data: string) => void 
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const scannerId = "reader";
    
    // 인스턴스 생성
    const html5QrCode = new Html5Qrcode(scannerId);
    scannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        // 카메라 권한 확인 및 시작
        await html5QrCode.start(
          { facingMode: "environment" }, // 후면 카메라 우선
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (navigator.vibrate) navigator.vibrate(100);
            onScanSuccess(decodedText);
          },
          () => {} // 스캔 실패(코드 미검출) 시 로직은 비워둠
        );
      } catch (err) {
        console.error("카메라 시작 에러:", err);
        alert("카메라를 켤 수 없습니다. 권한 설정을 확인하거나 HTTPS 환경인지 확인해주세요.");
        onClose();
      }
    };

    startScanner();

    // 언마운트 시 클린업 (매우 중요)
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current?.clear();
        }).catch(err => console.error("Stop failed", err));
      }
    };
  }, [onScanSuccess, onClose]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center">
      {/* 닫기 버튼 */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-[1001] p-3 bg-white/10 rounded-full text-white backdrop-blur-md"
      >
        <X className="w-6 h-6" />
      </button>

      {/* 가이드 문구 */}
      <div className="absolute top-20 text-center z-[1001]">
        <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
        <h3 className="text-white font-bold text-lg">QR 코드 스캔</h3>
        <p className="text-white/60 text-sm mt-1">사각형 안에 QR 코드를 맞춰주세요</p>
      </div>

      {/* 카메라 뷰 */}
      <div id="reader" className="w-full h-full object-cover" />

      {/* 스캔 가이드 라인 디자인 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 border-2 border-white/20 rounded-3xl relative">
          <div className="absolute inset-0 border-2 border-blue-500 rounded-3xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}