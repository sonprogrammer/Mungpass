'use client';

import { AuthProvider } from "@/entities/user/ui/AuthProvider";
import Script from 'next/script';
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import { Toaster } from 'react-hot-toast'
import { RefineProvider } from "@/app/RefineProvider";



dayjs.extend(relativeTime)
dayjs.extend(isBetween)
dayjs.locale("ko")
export default function LayoutContent({ children }: { children: React.ReactNode }) {


  const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;




  return (
    <AuthProvider>
      <RefineProvider>


        <Script
          src={KAKAO_SDK_URL}
          strategy="afterInteractive"
          onLoad={() => {
            if (window.kakao) {
              window.kakao.maps.load(() => {
              })
            }
          }}
        />

        {children}
        <Toaster position='top-center' reverseOrder={false} />

      </RefineProvider>
    </AuthProvider>
  );
}