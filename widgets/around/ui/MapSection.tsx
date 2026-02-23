import { MapSectionProps } from "@/widgets/around/model/types";
import { MapContainer } from "@/widgets/around/ui/MapContainer";
import { LocateFixed, RefreshCw } from "lucide-react";


export function MapSection({ center, places, showRefreshBtn, onMarkerClick, onBoundChange, onRefresh, onMyLocation }: MapSectionProps) {
  return (
    <div className="relative">

      <MapContainer
        center={center}
        places={places}
        onMarkerClick={onMarkerClick}
        onBoundChange={onBoundChange}
      />


      {showRefreshBtn && (
        <>
          <button
            onClick={onMyLocation}
            className='absolute top-10 right-10 z-10 bg-orange-400 p-1 rounded-lg cursor-pointer flex items-center justify-center'
            aria-label='현재위치로 이동'
          >
            <LocateFixed />
          </button>
          <button
            onClick={onRefresh}
            className='absolute top-10 left-1/2 -translate-x-1/2 z-40 bg-white/90 
                backdrop-blur-sm px-4 py-2 rounded-full shadow-xl border-2 border-orange-500
                text-orange-600 font-black text-xs flex items-center gap-2 animate-in slide-in-from-top-2
                hover:scale-105 active:scale-95 transition-all
                '
            aria-label='현 지도 지역내 검색'
          >
            <RefreshCw className="w-3 h-3" /> 이 지역 내 재검색
          </button>
        </>
      )}

    </div>
  )
}