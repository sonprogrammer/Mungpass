
import { GreetMessageProps } from "@/widgets/home/model/types";


export function GreetMessage({ userData, myDog }: GreetMessageProps) {
  console.log('user', myDog)
  return (
    <section className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">{userData?.name}님, 반가워요!</h2>

        {myDog ? (
          <p className="text-sm text-orange-500 font-medium">
            {myDog.name}는 지금 
            <span className="underline decoration-2">
              {myDog.status}
            </span>
          </p>

        ) : (
          <p className="text-slate-400 text-sm mt-1">
            아직 등록된 강아지가 없어요
          </p>
        )
        }
      </div>

    </section>
  )
}