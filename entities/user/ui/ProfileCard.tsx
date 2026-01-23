import { Dog } from "lucide-react";



export function ProfileCard({user}) {
    return(
        <div className="flex items-center gap-4">
            {/* 프로필 이미지  */}
            <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Dog className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-black text-slate-900">{user.nickname} 님</h2>
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-lg font-black">{user.myDog} 아빠</span>
              </div>
              <p className="text-sm text-slate-400 font-medium">{user.email}</p>
            </div>
          </div>
    )
}