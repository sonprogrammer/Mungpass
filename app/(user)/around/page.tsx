'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { MapPin, Search, SlidersHorizontal, Map as MapIcon, X, Star } from 'lucide-react';
import KakaoMap from '@/app/components/KakaoMap'; // 분리한 컴포넌트 임포트

export default function AroundPage() {
  const [filter, setFilter] = useState('전체');
  const [showMap, setShowMap] = useState(false);
  const [center, setCenter] = useState({ lat: 37.541, lng: 127.058 });
  const [realPlaces, setRealPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

  // 실제 주변 샵 검색
  const fetchNearbyShops = (coords: { lat: number, lng: number }) => {
    if (!window.kakao || !window.kakao.maps.services) return;
    const ps = new window.kakao.maps.services.Places();
    
    ps.keywordSearch('애견카페', (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setRealPlaces(data);
      }
    }, {
      location: new window.kakao.maps.LatLng(coords.lat, coords.lng),
      radius: 2000
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCenter(newCoords);
        
        // SDK가 로드될 때까지 약간의 대기 후 검색
        if (window.kakao && window.kakao.maps) {
          fetchNearbyShops(newCoords);
        }
      });
    }
  }, []);

  return (
    <div className="bg-[#FFFBEB] min-h-screen pb-24">
      <Script src={KAKAO_SDK_URL} onLoad={() => window.kakao.maps.load(() => {})} />

      {/* 헤더 섹션 */}
      <section className="p-6 bg-white rounded-b-[3rem] shadow-sm space-y-4 sticky top-0 z-30">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-900">어디로 갈까요?</h2>
            <p className="text-orange-500 text-sm font-bold">내 주변 멍패스 샵 🐾</p>
          </div>
          <button onClick={() => setShowMap(!showMap)} className={`p-3 rounded-2xl transition-all flex items-center gap-2 font-black text-xs ${showMap ? 'bg-orange-500 text-white shadow-lg' : 'bg-orange-50 text-orange-500'}`}>
            {showMap ? <X className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
            {showMap ? '닫기' : '지도보기'}
          </button>
        </div>

        {/* 검색창 & 필터 (생략된 기존 코드 유지) */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200" />
          <input type="text" placeholder="동네 이름이나 시설명을 검색해보세요" className="w-full pl-12 pr-4 py-4 bg-orange-50/50 border-2 border-orange-50 rounded-2xl outline-none focus:border-orange-500 transition-all text-sm font-bold" />
        </div>
      </section>

      {/* 지도 영역 (컴포넌트 호출) */}
      {showMap && (
        <div className="px-6 pt-4 animate-in fade-in zoom-in duration-300">
          <div className="w-full h-80 bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
            <KakaoMap 
              center={center} 
              places={realPlaces} 
              onMarkerClick={(place) => setSelectedPlace(place)} 
            />
          </div>
        </div>
      )}

      {/* 리스트 영역 (realPlaces 기반) */}
      <div className="p-6 space-y-5">
        {realPlaces.map((place) => (
          <div key={place.id} onClick={() => setSelectedPlace(place)} className="bg-white p-6 rounded-[2.5rem] border border-orange-50 shadow-sm">
             <h3 className="font-black text-slate-800 text-lg">{place.place_name}</h3>
             <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {place.address_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}