'use client';

import React from 'react';
import { X, Clock, Calendar, Bell } from 'lucide-react';

interface Notification {
  id: number;
  type: 'checkin' | 'reservation' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: 'checkin',
    title: '입실 완료 🐾',
    message: "'멍멍 브루어리 성수'에 초코가 입실했습니다. 즐거운 시간 보내세요!",
    time: '방금 전',
    isRead: false,
  },
  {
    id: 2,
    type: 'reservation',
    title: '예약 확정 ✅',
    message: '내일 오후 2시 [댕댕유치원] 예약이 성공적으로 완료되었습니다.',
    time: '30분 전',
    isRead: false,
  },
];

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-1000 flex justify-center">
      
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-120 h-full pointer-events-none">
        

        <div className="absolute right-0 top-0 w-full max-w-[320px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col rounded-l-[3rem] pointer-events-auto">
          

          <div className="p-8 pb-6 border-b border-orange-50">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                알림 <span className="text-sm bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">2</span>
              </h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Mung-Pass News</p>
          </div>
          

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {dummyNotifications.map((noti) => (
              <div 
                key={noti.id}
                className={`p-5 rounded-4xl border transition-all active:scale-[0.98] cursor-pointer ${
                  noti.isRead ? 'bg-white border-slate-100' : 'bg-orange-50/50 border-orange-100 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-xl ${
                    noti.type === 'checkin' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    {noti.type === 'checkin' ? (
                      <Clock className="w-4 h-4 text-orange-600" />
                    ) : (
                      <Calendar className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">{noti.time}</span>
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-1">{noti.title}</h4>
                <p className="text-[12px] font-medium text-slate-500 leading-relaxed">
                  {noti.message}
                </p>
              </div>
            ))}
          </div>


          <div className="p-6 bg-slate-50 rounded-tl-[3rem]">
            <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm">
              모든 알림 읽음 처리
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}