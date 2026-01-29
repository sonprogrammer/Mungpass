import { PlaceListProps } from "@/entities/place/model/types";
import { MapPin } from "lucide-react";

export function PlaceList({ places, placeClick }: PlaceListProps) {

  const sortedPlaces = [...places].sort((a, b) => Number(a.distance) - Number(b.distance))

  return (
    <div className="space-y-5">
      {sortedPlaces.map((place) => (
        <div
          key={place.id}
          onClick={() => placeClick(place)}
          className="bg-white p-6 rounded-[2.5rem] border border-orange-50 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">

              <h3 className="font-black text-slate-800 text-lg">
                {place.place_name}
              </h3>

              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {place.address_name}
              </p>


              {place.distance && (
                <p className="text-xs text-orange-500 mt-1">
                  {Number(place.distance) < 1000
                    ? `${place.distance}m`
                    : `${(Number(place.distance) / 1000).toFixed(1)}km`}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}