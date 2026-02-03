
import { MapProps } from "@/shared/types/map";
import KakaoMap from "@/shared/ui/map/KakaoMap";


export function MapContainer({center, places,onMarkerClick, onBoundChange}: MapProps){

    console.log('center', center, places)
    return(
        <div className="px-6 pt-4 animate-in fade-in zoom-in duration-300">
          <div className="w-full h-80 bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
            <KakaoMap 
              center={center} 
              places={places} 
              onMarkerClick={onMarkerClick} 
              onBoundChange={onBoundChange}
            />
          </div>
        </div>
    )
}