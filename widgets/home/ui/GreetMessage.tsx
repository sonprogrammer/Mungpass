import { UserProfile } from "@/entities/user/model/useUserStore";
import { Dog } from "lucide-react";

export function GreetMessage({userData, myDog}) {
  console.log('user', userData)
    return(
        <section className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{userData.nickname}님, 반가워요!</h2>
            <p className="text-orange-400 text-sm font-medium flex items-center gap-1 mt-1">
              {myDog.name}는 지금 <span className="underline decoration-2">{myDog.status}</span>
            </p>
          </div>
          <div className="w-16 h-16 bg-orange-200 rounded-3xl overflow-hidden border-4 border-white shadow-md">
             {/* 실제 강아지 사진이 들어갈 자리 */}
             <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-500">
                <Dog className="w-8 h-8" />
             </div>
          </div>
        </section>
    )
}