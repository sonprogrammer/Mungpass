'use client';

import { useState } from 'react';

import { useGetNearByShops } from '@/features/search-shop/model/useGetNearByShops';
import { AroundHeader } from '@/widgets/around/ui/AroundHeader';
import { MapContainer } from '@/widgets/around/ui/MapContainer';
import { KakaoPlace } from '@/shared/types/map';
import { PlaceListState } from '@/entities/place/ui/PlaceListState';
import { BottomSheet } from '@/shared/ui/place/BottomSheet';
import { PlaceDetailSheet } from '@/entities/place/ui/PlaceDetailSheet';

export default function AroundPage() {
  const [showMap, setShowMap] = useState<boolean>(false)
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null)
  const { data, isPending } = useGetNearByShops()

  const center = data.center
  const places = data.places
  console.log('selecte', !!selectedPlace)
  return (
    <div className="bg-[#FFFBEB] h-screen pb-24">

      <AroundHeader showMap={showMap} toggle={() => setShowMap(prev => !prev)} />

      <main>
        {showMap && (
          <MapContainer
            center={center}
            places={places}
            onMarkerClick={(place: KakaoPlace) => {
              console.log('내 장소:', place)
            }}
          />
        )}

        <div className='p-6'>

          <PlaceListState
            isPending={isPending}
            places={places}
            onPlaceClick={(place) => {
              console.log('place info', place)
              setSelectedPlace(place)
            }
            }
          />
        </div>

        <BottomSheet
          isOpen={selectedPlace !== null}
          onClose={() => setSelectedPlace(null)}
        >
          {selectedPlace && <PlaceDetailSheet place={selectedPlace} />}
        </BottomSheet>
      </main>
    </div>
  );
}