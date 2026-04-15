import { ProfileCardProps } from "@/entities/user/model/useUserStore";
import { Skeleton } from "antd";
import { Dog } from "lucide-react";



export function ProfileCard({ user }: ProfileCardProps) {


  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton.Button 
          active 
          style={{ width: 64, height: 64, borderRadius: '1.5rem' }} 
        />
        <div className="flex flex-col gap-2">
          <Skeleton.Input active style={{ width: 80, height: 24, borderRadius: '6px' }} />
          <Skeleton.Input active style={{ width: 140, height: 16, borderRadius: '4px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* //* 프로필 이미지있으면 변경 (avatar_url) */}
      <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
        {user.avatar_url ? (
          <div>
            <img src={user.avatar_url} alt="프로필 사진" />
          </div>
        ) : (
          <Dog className="w-8 h-8" />
        )}
      </div>
      <div>
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-black text-slate-900">{user?.name} 님</h2>
        </div>
        <p className="text-sm text-slate-400 font-medium">{user?.email}</p>
      </div>
    </div>
  )
}