'use client';

import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface MapProps {
  center: { lat: number; lng: number };
  places: any[];
  onMarkerClick: (place: any) => void;
}

export default function KakaoMap({ center, places, onMarkerClick }: MapProps) {
  return (
    <div className="w-full h-full relative">
      <Map
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={4}
        isPanto={true}
      >
        {/* 현재 내 위치 마커 (기본 마커) */}
        <MapMarker position={center} />

        {/* 주변 실제 샵 마커들 */}
        {places.map((place) => (
          <MapMarker
            key={place.id}
            position={{ lat: Number(place.y), lng: Number(place.x) }}
            onClick={() => onMarkerClick(place)}
            // 카카오 기본 별 마커 이미지
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: { width: 24, height: 35 }
            }}
          />
        ))}
      </Map>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-full px-10">
        <p className="bg-white/90 backdrop-blur-md py-2 rounded-full text-[10px] font-black shadow-sm text-slate-500 text-center">
          마커를 클릭해 멍패스 샵 정보를 확인하세요 🐾
        </p>
      </div>
    </div>
  );
}