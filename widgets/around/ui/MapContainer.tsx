
import { useGetPartnerShops } from "@/entities/place/model/useGetPartnerShops";
import { MapProps } from "@/shared/model/map";
import KakaoMap from "@/shared/ui/map/KakaoMap";
import { useMemo } from "react";

export function MapContainer({ center, places, onMarkerClick, onBoundChange }: MapProps) {

  const { data: partners} = useGetPartnerShops(places)

  const refinedPlaces = useMemo(() => {
    const partnerIdSet = new Set(partners?.map(p => p.kakao_place_id))
    return places.map(place => ({
      ...place,
      isPartner: partnerIdSet.has(place.id)
    }))
  },[partners, places])
  
  console.log('refined', refinedPlaces)

  return (
    <div className="px-6 pt-4 animate-in fade-in zoom-in duration-300">
      <div className="w-full h-80 bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
        <KakaoMap
          center={center}
          places={refinedPlaces}
          onMarkerClick={onMarkerClick}
          onBoundChange={onBoundChange}
        />
      </div>
    </div>
  )
}