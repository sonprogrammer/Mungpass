'use client'
import { useGetMyPetUsage } from "@/features/qr/model/useGetMyPetUsage";
import { GreetMessageProps } from "@/widgets/home/model/types";


export function GreetMessage({ userData, myDog }: GreetMessageProps) {

  const { data: dogStatus } = useGetMyPetUsage({ statuses: ['staying'] })

  const primaryDog = dogStatus?.find(useage => useage.dog.is_primary)

  const displayDog = primaryDog || (dogStatus && dogStatus[0])



  return (
    <section className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">{userData?.name}님, 반가워요!</h2>

        {displayDog ? (
          <p className="text-sm text-orange-500 font-medium mt-1">
            <span className="font-bold">{displayDog.dog.name}</span>(이)는 지금{" "}
            <span className="font-bold text-orange-600">
              {displayDog.shop?.name || "매장"}
            </span>
            에서 이용 중이에요!
          </p>
        ) :
          myDog && myDog.length > 0 ? (
            <p className="text-slate-400 text-sm mt-1">
              오늘은 아직 멍패스를 이용하지 않았네요!
            </p>
          ) :
            (
              <p className="text-slate-400 text-sm mt-1">
                아직 등록된 강아지가 없어요. 새 식구를 등록해보세요!
              </p>
            )}
      </div>

    </section>
  )
}