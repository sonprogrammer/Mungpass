'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useGetNearByShops } from '@/features/search-shop/model/useGetNearByShops';
import { AroundHeader } from '@/widgets/around/ui/AroundHeader';
import { MapContainer } from '@/widgets/around/ui/MapContainer';
import { PlaceList } from '@/widgets/around/ui/PlaceList';
import { KakaoPlace } from '@/shared/types/map';

export default function AroundPage() {
  const [showMap, setShowMap] = useState<boolean>(false)
  const { data, isPending} = useGetNearByShops()

  const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

  const center = data.center
  const places = data.places
  console.log('places',places)

  return (
    <div className="bg-[#FFFBEB] min-h-screen pb-24">
      <Script src={KAKAO_SDK_URL} onLoad={() => window.kakao.maps.load(() => {})} />

      <AroundHeader showMap={showMap} toggle={() => setShowMap(prev => !prev)} />

      <main>
        {showMap && (
          <MapContainer 
            center={center} 
            places={places} 
            onMarkerClick={(place: KakaoPlace) => console.log('선택된 장소:', place)} 
          />
        )}

        {isPending ? (
          <div className="p-20 text-center">
            <div className="inline-block animate-bounce mb-4 text-4xl">🐾</div>
            <p className="text-slate-400 font-black text-sm">가까운 멍패스 샵을 찾고 있어요...</p>
          </div>
        ) : (
          <PlaceList 
            places={places} 
            placeClick={(place) => console.log('리스트 클릭:', place)} 
          />
        )}
      </main>
    </div>
  );
}