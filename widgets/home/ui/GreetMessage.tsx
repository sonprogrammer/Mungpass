
import { GreetMessageProps } from "@/widgets/home/model/types";


export function GreetMessage({ userData, myDog }: GreetMessageProps) {
  console.log('user', myDog)

  const primaryDog = myDog?.find(dog => dog.is_primary)

  const displayDog = primaryDog || (myDog && myDog[0])

  return (
    <section className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">{userData?.name}님, 반가워요!</h2>

        {myDog && myDog.length > 0 && displayDog ? (
          <p className="text-sm text-orange-500 font-medium mt-1">
            <span className="font-bold">{displayDog.name}</span>는(이) 지금
            <span className="underline decoration-2 underline-offset-2">
              {displayDog.status || ' 쉬는 중'}
            </span>
          </p>
        ) : (
          <p className="text-slate-400 text-sm mt-1">
            아직 등록된 강아지가 없어요. 새 식구를 등록해보세요!
          </p>
        )}
      </div>

    </section>
  )
}