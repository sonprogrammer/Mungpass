'use client'

import { Spin } from "antd"

interface LoadingToStoreRegister{
    storeStatusInfo?: {
        id: string
        status?: string
        name?: string
        
    } | null,
    isPending: boolean
}

export function LoadingToStoreRegister({storeStatusInfo, isPending}: LoadingToStoreRegister) {
    return(
        <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="bg-white p-8 rounded-4xl shadow-xl text-center flex flex-col items-center max-w-75 animate-in fade-in zoom-in duration-300">
          <div className="mb-6 relative">
            <Spin size="large" />
            <div className="absolute inset-0 flex items-center justify-center text-xl">
              🏠
            </div>
          </div>
          
          <h3 className="text-lg font-black text-slate-800 mb-2">
            {!storeStatusInfo && !isPending ? "매장 정보가 없네요!" : "정보 확인 중"}
          </h3>
          
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {!storeStatusInfo && !isPending 
              ? "매장 등록 페이지로\n안전하게 이동해 드릴게요." 
              : "사장님의 소중한 정보를\n불러오고 있습니다."}
          </p>
          
          <div className="mt-6 flex gap-1">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
    )
}