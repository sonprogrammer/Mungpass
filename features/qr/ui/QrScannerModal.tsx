'use client';

import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import { App } from 'antd';

export function QrScannerModal({ onClose, onScanSuccess }: {
  onClose: () => void,
  onScanSuccess: (data: string) => void
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const isInitialized = useRef(false)
  const isProcessing = useRef(false)
  const onCloseRef = useRef(onClose)
  const onScanSuccessRef = useRef(onScanSuccess)

  const { message } = App.useApp()

   useEffect(() => {
    onCloseRef.current = onClose
    onScanSuccessRef.current = onScanSuccess
  }, [onClose, onScanSuccess])

  useEffect(() => {
    if (isInitialized.current) return;

    const scannerId = "reader"
    const html5QrCode = new Html5Qrcode(scannerId)
    scannerRef.current = html5QrCode

    let cancelled = false
    // isInitialized.current = true

    const startScanner = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras()

        if (cancelled) return

        console.log('사용 가능한 카메라:', cameras)

        const preferredCamera = cameras.find(camera => {
          const label = camera.label.toLowerCase()

          const isBackCamera =
            label.includes('후면') ||
            label.includes('back') ||
            label.includes('rear')

          const isExcludedCamera =
            label.includes('울트라') ||
            label.includes('ultra') ||
            label.includes('망원') ||
            label.includes('telephoto')

          return isBackCamera && !isExcludedCamera
        })

        const cameraConfig = preferredCamera
          ? preferredCamera.id
          : { facingMode: 'environment' }

        console.log('선택된 카메라:', preferredCamera ?? 'environment fallback')

        if (cancelled || html5QrCode.isScanning) return

        await html5QrCode.start(
          cameraConfig,
          {
            fps: 10,
            qrbox: (viewWidth, viewHeight) => {
              const size = Math.min(256, viewWidth * 0.8, viewHeight * 0.8)

              return {
                width: size,
                height: size
              }
            }
          },
          async decodedText => {
            if (isProcessing.current) return

            isProcessing.current = true

            console.log('QR 인식 성공:', decodedText)

            if (navigator.vibrate) {
              navigator.vibrate(100)
            }

            if (typeof window !== 'undefined' && navigator.vibrate) {
              navigator.vibrate(100)
            }

            try {
               if (html5QrCode.isScanning) {
                await html5QrCode.stop()
              }

              onScanSuccessRef.current(decodedText)
            } catch (err) {
              console.warn('스캐너 중지 에러:', err)
              onScanSuccessRef.current(decodedText)
            }
          },
          errorMessage => {
            console.log('QR 인식 시도 실패:', errorMessage)
          }
        )
      } catch (err) {
        console.error('카메라 시작 에러:', err)

        if (
          err instanceof Error &&
          (err.name === 'NotAllowedError' || err.name === 'NotFoundError')
        ) {
          message.error('카메라 권한이 없거나 카메라를 찾을 수 없습니다.')
          onCloseRef.current()
        }
      }
    }

    startScanner()

    return () => {
      cancelled = true
      isProcessing.current = false

      if (html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch(err => {
            console.warn('Cleanup stop ignored:', err)
          })
      } else {
        html5QrCode.clear()
      }
    }
  }, [message])

  return (
    <div className="fixed inset-0 z-1000 h-dvh w-screen bg-black flex flex-col items-center justify-center overflow-hidden">

      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-1001 p-3 bg-white/10 rounded-full text-white backdrop-blur-md active:scale-95"
      >
        <X className="w-6 h-6" />
      </button>

      {/* //*가이드 문구 */}
      <div className="absolute top-20 text-center z-1001 pointer-events-none">
        <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
        <h3 className="text-white font-bold text-lg">QR 코드 스캔</h3>
        <p className="text-white/60 text-sm mt-1 px-6">사각형 안에 QR 코드를 맞춰주세요</p>
      </div>

      {/* //*카메라*/}
      <div id="reader" className="w-full h-full [&>video]:w-full [&>video]:h-full [&>video]:object-cover" />

      {/* //*스캔 가이드 라인 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-1001">
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