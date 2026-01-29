'use client';

import { usePathname } from "next/navigation";
import Header from "@/widgets/header/ui/Header";
import Navbar from "@/widgets/navbar/ui/Navbar";
import { AuthProvider } from "@/entities/user/ui/AuthProvider";
import Script from 'next/script';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

  return (
    <AuthProvider>

      <Script
        src={KAKAO_SDK_URL}
        strategy="afterInteractive" 
        onLoad={() => {
          if (window.kakao) {
            window.kakao.maps.load(() => {
              console.log("카카오 맵 로드 완료!");
            });
          }
        }}
      />

      <div className="flex justify-center bg-slate-200 h-screen">
        <div className="w-full max-w-120 bg-white h-screen flex flex-col relative shadow-2xl">
          {!isAuthPage && <Header />}

          <main className={`flex-1 bg-[#FFFBEB] overflow-y-auto `}>
            {children}
          </main>

          {!isAuthPage &&
            <div className="bg-[#FFFBEB] w-full shrink-0">
              <Navbar />
            </div>
          }
        </div>
      </div>
    </AuthProvider>
  );
}