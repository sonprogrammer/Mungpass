'use client';

import { KakaoMapProps, PartnerKakaoPlace } from '@/shared/model/map';
import React, { memo } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';


function KakaoMap({ center, places, onMarkerClick, onBoundChange }: KakaoMapProps) {

  return (
    <div className="w-full h-full relative">
      <Map
        center={{ lat: center.lat, lng: center.lon }}
        style={{ width: "100%", height: "100%" }}
        level={4}
        isPanto={true}
        scrollwheel={true}
        onIdle={(map) =>{
          if(onBoundChange){
            const currentBound = map.getBounds()
            const sw = currentBound.getSouthWest()
            const ne = currentBound.getNorthEast()
          
            onBoundChange({
                sw: { lat: sw.getLat(), lon: sw.getLng()},
                ne: { lat: ne.getLat(), lon: ne.getLng()}
            })
          }
        }}
      >

          <MapMarker position={{ lat: center.lat, lng: center.lon }} />

        {places.slice(0,20).map((place: PartnerKakaoPlace) => {

        return(
          <React.Fragment key={place.id}>
            <MapMarker
              position={{ lat: Number(place.y), lng: Number(place.x) }}
              onClick={() => onMarkerClick(place)}
              image={place.isPartner ? { src: '/dog.png', size: { width: 34, height: 34 } } : undefined}
            />

            <CustomOverlayMap
              position={{ lat: Number(place.y), lng: Number(place.x) }}
              yAnchor={2.3}
            >
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-orange-100 shadow-sm">
                <p className="text-[10px] font-black text-orange-500 whitespace-nowrap">
                  {place.place_name}
                </p>
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        )}
        )}
      </Map>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-full px-10">
        <p className="bg-white/90 backdrop-blur-md py-2 rounded-full text-[10px] font-black shadow-sm text-slate-500 text-center">
          마커를 클릭해 멍패스 샵 정보를 확인하세요
        </p>
      </div>
    </div>
  );
}

export default memo(KakaoMap)