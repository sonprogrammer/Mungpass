import { PlaceListProps } from "@/widgets/around/model/types";
import { MapPin } from "lucide-react";

export function PlaceList({places, placeClick}: PlaceListProps) {
    return(
        <div className="p-6 space-y-5">
        {places.map((place) => (
          <div 
            key={place.id} 
            onClick={() => placeClick(place)} 
            className="bg-white p-6 rounded-[2.5rem] border border-orange-50 shadow-sm"
          >
             <h3 className="font-black text-slate-800 text-lg">{place.place_name}</h3>
             <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> 
                {place.address_name}
            </p>
          </div>
        ))}
      </div>
    )
}