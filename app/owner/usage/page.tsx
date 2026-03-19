'use client'

import { UsageTabs } from "@/features/owner/ui/UsageTabs";
import { CurrentLogList } from "@/widgets/owner/ui/CurrentLogList";
import { useState } from "react";

export default function UsagePage() {
    const [tab, setTab]= useState<'current' | 'checkout'>('current')

    const currentUsers = [
        { id: 1, petName: '보리', breed: '시바견', startTime: '15:30', duration: '2시간 15분', type: '유치원', petImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200&auto=format&fit=crop' },
        { id: 2, petName: '두부', breed: '말티즈', startTime: '11:45', duration: '1시간 00분', type: '호텔'},
        { id: 2, petName: '두부', breed: '말티즈', startTime: '11:45', duration: '1시간 00분', type: '호텔'},
    
      ]
    
      // 오늘 완료된 내역
      const todayDone = [
        { id: 101, petName: '초코', type: '유치원', totalTime: '4시간 30분', price: '22,000원' },
      ]

      const mockCurrentData = [
        {
          id: '1',
          petName: '초코',
          petImage: '',
          breed: '푸들',
          type: '유치원' as const,
          startTime: '10:30',
          duration: '2시간 10분',
          status: '이용중' as const,
          ownerName: '김영진',
        },
        {
          id: '2',
          petName: '보리',
          petImage: '',
          breed: '말티즈',
          type: '호텔' as const,
          startTime: '09:40',
          duration: '3시간 00분',
          status: '이용중' as const,
          ownerName: '이민수',
        },
        {
          id: '2',
          petName: '보리',
          petImage: '',
          breed: '말티즈',
          type: '호텔' as const,
          startTime: '09:40',
          duration: '3시간 00분',
          status: '이용중' as const,
          ownerName: '이민수',
        },
        {
          id: '2',
          petName: '보리',
          petImage: '',
          breed: '말티즈',
          type: '호텔' as const,
          startTime: '09:40',
          duration: '3시간 00분',
          status: '이용중' as const,
          ownerName: '이민수',
        },
        {
          id: '2',
          petName: '보리',
          petImage: '',
          breed: '말티즈',
          type: '호텔' as const,
          startTime: '09:40',
          duration: '3시간 00분',
          status: '이용중' as const,
          ownerName: '이민수',
        },
        {
          id: '2',
          petName: '보리',
          petImage: '',
          breed: '말티즈',
          type: '호텔' as const,
          startTime: '09:40',
          duration: '3시간 00분',
          status: '이용중' as const,
          ownerName: '이민수',
        },
        {
          id: '2',
          petName: '보리',
          petImage: '',
          breed: '말티즈',
          type: '호텔' as const,
          startTime: '09:40',
          duration: '3시간 00분',
          status: '이용중' as const,
          ownerName: '이민수',
        },
        {
          id: '2',
          petName: '보리',
          petImage: '',
          breed: '말티즈',
          type: '호텔' as const,
          startTime: '09:40',
          duration: '3시간 00분',
          status: '이용중' as const,
          ownerName: '이민수',
        },
      ]

    //  TODO 퇴실처리하는 거 해야함
      const checkout = () => console.log('checkout')
    
    return(
        <div className="h-full flex flex-col"> 
            <UsageTabs activeTab={tab} onChange={setTab} currentCount={currentUsers.length} checkoutCount={todayDone.length}/>
            <div className="flex-1 overflow-hidden mt-3">
                <CurrentLogList data={mockCurrentData} onCheckout={checkout}/>
            </div>
        </div>
    )
}