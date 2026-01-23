'use client';

import { useUserStore } from "@/entities/user/model/useUserStore";
import { GreetMessage, MembershipCard, QrCheckIn, Menu, NearByPlace } from "@/widgets/home/ui";




export default function HomePage() {
  const { profile, isLoading } = useUserStore(); 


  if (isLoading) return <div>로딩 중...</div>;
  const userData = { name: "홍길동", myCoupons: 2, visitCount: 12 };
  const myDog = { name: "초코", status: "집에서 쉬는 중" };


  return (
    <div className="min-h-screen bg-[#FFFBEB] pb-24 font-sans">

      <main className="p-6 max-w-md mx-auto space-y-6">
        {/* //*GreetMsg부분 */}
        <GreetMessage userData={profile} myDog={myDog} />

        {/* //* 쿠폰 */}
        <MembershipCard userData={userData} />

        {/* //*QR  */}
        <QrCheckIn />

        {/* //* 퀵메뉴 */}
        <Menu />

        {/* //*주변 애견카페  */}
        <NearByPlace />
      </main>

    </div>
  );
}