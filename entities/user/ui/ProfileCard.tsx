import { ProfileCardProps} from "@/entities/user/model/useUserStore";
import { Dog } from "lucide-react";



export function ProfileCard({user}:ProfileCardProps) {
  console.log('userㅇㄹㅇㅁㄴ' , user)

  if(!user) return <div>user inof no</div>
  
    return(
        <div className="flex items-center gap-4">
            {/* //* 프로필 이미지있으면 변경 (avatar_url) */}
            <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Dog className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-black text-slate-900">{user?.name} 님</h2>
                {/* //TODO 강아지 관련 도 가져와야함 Props로 강아지 정보도 받아오기 */}
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-lg font-black">{user.user?.myDog ? 'ㅇㅇ' : '강아지 등록 필수'}</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">{user?.email}</p>
            </div>
          </div>
    )
}