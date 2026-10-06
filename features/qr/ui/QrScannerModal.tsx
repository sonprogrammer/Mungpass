'use client';

import React, { useEffect, useRef } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { X, Camera } from 'lucide-react';
import { App } from 'antd';

export function QrScannerModal({
  onClose,
  onScanSuccess
}: {
  onClose: () => void
  onScanSuccess: (data: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const controlsRef = useRef<IScannerControls | null>(null)
  const isProcessing = useRef(false)
  const onCloseRef = useRef(onClose)
  const onScanSuccessRef = useRef(onScanSuccess)

  const { message } = App.useApp()

  useEffect(() => {
    onCloseRef.current = onClose
    onScanSuccessRef.current = onScanSuccess
  }, [onClose, onScanSuccess])

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const codeReader = new BrowserQRCodeReader()
    let cancelled = false

    const startScanner = async () => {
      try {
        const devices = await BrowserQRCodeReader.listVideoInputDevices()

        if (cancelled) return

        const backCamera =
          devices.find(device => {
            const label = device.label.toLowerCase()

            return (
              label.includes('후면 카메라') ||
              label.includes('back camera') ||
              label.includes('rear camera')
            )
          }) ??
          devices.find(device => {
            const label = device.label.toLowerCase()

            const isBackCamera =
              label.includes('후면') ||
              label.includes('back') ||
              label.includes('rear')

            const isExcludedCamera =
              label.includes('ultra') ||
              label.includes('울트라') ||
              label.includes('telephoto') ||
              label.includes('망원')

            return isBackCamera && !isExcludedCamera
          })

        if (cancelled) return

        const controls = await codeReader.decodeFromVideoDevice(
          backCamera?.deviceId,
          video,
          (result, error, controls) => {
            if (!result || isProcessing.current) return

            isProcessing.current = true
            controlsRef.current = controls

            if (navigator.vibrate) {
              navigator.vibrate(100)
            }

            controls.stop()
            onScanSuccessRef.current(result.getText())
          }
        )

        if (cancelled) {
          controls.stop()
          return
        }

        controlsRef.current = controls
      } catch (err) {
        if (cancelled) return

        console.error('카메라 시작 에러:', err)

        if (
          err instanceof Error &&
          (err.name === 'NotAllowedError' ||
            err.name === 'NotFoundError' ||
            err.name === 'NotReadableError')
        ) {
          message.error('카메라 권한이 없거나 카메라를 사용할 수 없습니다.')
          onCloseRef.current()
        }
      }
    }

    startScanner()

    return () => {
      cancelled = true
      isProcessing.current = false
      controlsRef.current?.stop()
      controlsRef.current = null

      if (video.srcObject instanceof MediaStream) {
        video.srcObject.getTracks().forEach(track => track.stop())
        video.srcObject = null
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

      <div className="absolute top-20 text-center z-1001 pointer-events-none">
        <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
        <h3 className="text-white font-bold text-lg">
          QR 코드 스캔
        </h3>
        <p className="text-white/60 text-sm mt-1 px-6">
          QR 코드가 화면 중앙에 보이도록 맞춰주세요
        </p>
      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

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
  )
}