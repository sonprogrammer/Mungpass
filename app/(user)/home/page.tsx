'use client';

import { GreetMessage, MembershipCard, QrCheckIn, Menu, NearByPlace } from "@/widgets/home/ui";




export default function HomePage() {

  const userData = { name: "홍길동", myCoupons: 2, visitCount: 12 };
  const myDog = { name: "초코", status: "집에서 쉬는 중" };


  return (
    <div className="min-h-screen bg-[#FFFBEB] pb-24 font-sans">

      <main className="p-6 max-w-md mx-auto space-y-6">
        {/* //*GreetMsg부분 */}
        <GreetMessage userData={userData} myDog={myDog} />

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