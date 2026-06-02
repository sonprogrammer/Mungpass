'use client'

import { useDogStore } from "@/entities/dog/model";
import { useUserStore } from "@/entities/user/model";
import { useGetMyDogs } from "@/features/dog/model";
import { DogFormModal } from "@/features/dog/ui";
import { KakaoScriptProvider } from "@/shared/ui/map";
import { MapLoading } from "@/widgets/around/ui";
import { DogDetailModal } from "@/widgets/dog/ui";
import { MyDogWidget } from "@/widgets/home/dog/ui";
import { GreetMessage, Menu, NearByPlace, QrCheckIn } from "@/widgets/home/ui";
import { HomeSkeleton } from "@/widgets/home/ui/HomeSkeleton";
import { useState } from "react";



export function HomePageWidget() {
  const { profile, isLoading } = useUserStore()
  const { data: dogs=[], isPending: isDogsPending } = useGetMyDogs()
  const userId = profile?.id


  const [dogPostModalOpen, setDogPostModalOpen] = useState<boolean>(false)
  const [dogViewModalOpen, setDogViewModalOpen] = useState<boolean>(false)

  const selectedDog = useDogStore(state => state.selectedDog)


  if (isLoading || !userId) return <HomeSkeleton />


  return (
    <div className="h-full">

      <main className="p-6 space-y-6 ">
        {/* //*GreetMsg부분 */}
        <GreetMessage userData={profile} myDog={dogs} />


        {/* //* 쿠폰 --> 나중에 확장시 */}
        {/* <MembershipCard userData={userData} /> */}

        <MyDogWidget dogPostModal={() => setDogPostModalOpen(true)} dogViewModal={() => setDogViewModalOpen(true)} />



        {/* //*QR  */}
        <QrCheckIn dogs={dogs} isDogsPending={isDogsPending} userId={userId}/>

        {/* //* 퀵메뉴 */}
        <Menu />

        {/* //*주변 애견카페  */}
        <KakaoScriptProvider fallback={
          <MapLoading message="주변 플레이스 로드 중..."/>
        }>
          <NearByPlace />
        </KakaoScriptProvider>
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