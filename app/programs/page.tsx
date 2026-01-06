'use client';

import React, { useState } from 'react';
import { MapPin, Calendar, Star, Info, CheckCircle, Share2 } from 'lucide-react';
//* 목업
const PROGRAMS_DATA = [
  {
    id: 1,
    category: "POP-UP STORE",
    title: "플랜얼라이언스 성수 팝업",
    location: "서울 성동구 연무장길 12",
    date: "2026.01.10 - 01.20",
    status: "진행중",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=300&auto=format&fit=crop",
    points: 100
  },
  {
    id: 2,
    category: "EXHIBITION",
    title: "미디어 아트: 기획자의 시선",
    location: "서울 용산구 한남대로",
    date: "2026.02.01 - 02.15",
    status: "예정",
    image: "https://images.unsplash.com/photo-1554941068-a252680d25d9?q=80&w=300&auto=format&fit=crop",
    points: 150
  },
  {
    id: 3,
    category: "WORKSHOP",
    title: "브랜딩 전략 컨퍼런스",
    location: "서울 강남구 테헤란로",
    date: "2026.01.05 - 01.06",
    status: "종료",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=300&auto=format&fit=crop",
    points: 200
  }
];

export default function Programs() {
  const [filter, setFilter] = useState('전체');
  const [selectedProgram, setSelectedProgram] = useState<typeof PROGRAMS_DATA[0] | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/*//* 헤더 섹션 */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900">프로그램</h2>
        <p className="text-slate-500 text-sm mt-1">참여하고 마일리지를 적립하세요.</p>
      </section>

      <div className="space-y-4">
        {PROGRAMS_DATA.filter(p => filter === '전체' || p.status === filter).map((program) => (
          <div
            key={program.id}
            onClick={() => setSelectedProgram(program)} // 클릭 시 상세 데이터 세팅
            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
          >

            <div className="relative h-40 bg-slate-200">
              <img src={program.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold">{program.status}</div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-800">{program.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{program.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* //* 상세 정보 */}
      {selectedProgram && (
        <div
          onClick={() => setSelectedProgram(null)}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-all"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-120 bg-white rounded-t-[40px] shadow-2xl animate-in slide-in-from-bottom duration-300"
          >
            <div className="flex justify-center p-4">
              <button
                onClick={() => setSelectedProgram(null)}
                className="w-12 h-1.5 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors"
              />
            </div>

            <div className="px-6 pb-10 max-h-[85vh] overflow-y-auto scrollbar-hide">
              {/* //* 상단 타이틀 및 공유 버튼 */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-blue-600 text-xs font-bold px-2 py-1 bg-blue-50 rounded-md">
                    {selectedProgram.category}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2 leading-tight">
                    {selectedProgram.title}
                  </h3>
                </div>
                <button className="p-2 bg-slate-50 rounded-full text-slate-400">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* //* 주요 정보 영역 */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">적립 포인트</p>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-800">{selectedProgram.points} P</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">참여 상태</p>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-slate-800">{selectedProgram.status}</span>
                  </div>
                </div>
              </div>

              {/*  //*상세 설명 및 안내 */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" /> 프로그램 안내
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    본 프로그램은 플랜얼라이언스 회원 전용 오프라인 이벤트입니다.
                    현장에 비치된 QR 코드를 스캔하시면 즉시 {selectedProgram.points} 마일리지가 적립됩니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800">위치 및 일시</h4>
                  <div className="space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{selectedProgram.location}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{selectedProgram.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* //* 하단 고정 버튼부 */}
              <div className="mt-8 flex gap-3 sticky bottom-0 bg-white pt-2">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl active:scale-95 transition-all"
                >
                  닫기
                </button>
                <button className="flex-2 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-all">
                  참여 예약하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}