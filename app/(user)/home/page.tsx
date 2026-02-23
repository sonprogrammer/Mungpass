'use client';

import { useDogStore } from "@/entities/dog/model/types";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { useGetMyDogs } from "@/features/dog/model/useGetMyDogs";

import { DogFormModal } from "@/features/dog/ui/DogFormModal";
import { DogDetailModal } from "@/widgets/dog/ui/DogDetailModal";

import { MyDogWidget } from "@/widgets/home/dog/ui/MyDogWidget";
import { GreetMessage, QrCheckIn, Menu, NearByPlace } from "@/widgets/home/ui";
import { HomeSkeleton } from "@/widgets/home/ui/HomeSkeleton";
import { useState } from "react";



export default function HomePage() {
  const { profile, isLoading } = useUserStore()
  const { data: dogs } = useGetMyDogs(profile?.id)
  // console.log('dafasd', dogs)

  const [dogPostModalOpen, setDogPostModalOpen] = useState<boolean>(false)
  const [dogViewModalOpen, setDogViewModalOpen] = useState<boolean>(false)

  const selectedDog = useDogStore(state => state.selectedDog)


  if (isLoading) return <HomeSkeleton />;
  // const userData = { name: "홍길동", myCoupons: 2, visitCount: 12 };
  // const myDog = { name: "초코", status: "집에서 쉬는 중" };


  return (
    <div className="h-full">

      <main className="p-6 space-y-6 ">
        {/* //*GreetMsg부분 */}
        <GreetMessage userData={profile} myDog={dogs} />


        {/* //* 쿠폰 --> 나중에 확장시 */}
        {/* <MembershipCard userData={userData} /> */}

        <MyDogWidget dogPostModal={() => setDogPostModalOpen(true)} dogViewModal={() => setDogViewModalOpen(true)} />



        {/* //*QR  */}
        <QrCheckIn />

        {/* //* 퀵메뉴 */}
        <Menu />

        {/* //*주변 애견카페  */}
        <NearByPlace />
      </main>

      <DogFormModal
        isOpen={dogPostModalOpen}
        onClose={() => setDogPostModalOpen(false)}
        profile={profile}
      />

      {dogViewModalOpen && selectedDog && (

        <DogDetailModal
          key={selectedDog?.id}
          isOpen={dogViewModalOpen}
          onClose={() => setDogViewModalOpen(false)}
        />
      )}

    </div>
  );
}