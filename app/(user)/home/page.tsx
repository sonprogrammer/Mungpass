'use client';

import { useDogStore } from "@/entities/dog/model/types";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { MyDogWidget } from "@/widgets/home/dog/ui/MyDogWidget";
import { GreetMessage, QrCheckIn, Menu, NearByPlace } from "@/widgets/home/ui";
import { HomeSkeleton } from "@/widgets/home/ui/HomeSkeleton";





export default function HomePage() {
  const { profile, isLoading } = useUserStore()
  const dog = useDogStore(state => state.dog)

  if (isLoading) return <HomeSkeleton />;
  // const userData = { name: "홍길동", myCoupons: 2, visitCount: 12 };
  // const myDog = { name: "초코", status: "집에서 쉬는 중" };


  return (
    <div className="h-full">

      <main className="p-6 space-y-6 ">
        {/* //*GreetMsg부분 */}
        <GreetMessage userData={profile} myDog={dog} />
        

        {/* //* 쿠폰 --> 나중에 확장시 */}
        {/* <MembershipCard userData={userData} /> */}

        <MyDogWidget />

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