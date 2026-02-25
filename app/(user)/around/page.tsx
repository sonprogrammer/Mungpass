'use client';


import { AroundHeader } from '@/widgets/around/ui/AroundHeader';
import { PlaceListState } from '@/entities/place/ui/PlaceListState';
import { BottomSheet } from '@/shared/ui/place/BottomSheet';
import { PlaceDetailSheet } from '@/entities/place/ui/PlaceDetailSheet';
import { useAroundState } from '@/widgets/around/model/useAroundState';
import { MapSection } from '@/widgets/around/ui/MapSection';

export default function AroundPage() {
  const { state, actions } = useAroundState()

  return (
    <div className="bg-[#FFFBEB] h-screen pb-24">

      <AroundHeader
        showMap={state.showMap}
        toggle={actions.handleToggleMap}
        onSearch={actions.setKeyword}
        searchValue={state.searchValue}
        setSearchValue={actions.setSearchValue}
        radius={state.radius}
        setRadius={actions.setRadius}
      />

      <main>
        {state.showMap && (
          <MapSection 
            center={state.center}
            places={state.displayShops}
            showRefreshBtn={state.showRefreshBtn}
            onMarkerClick={actions.setSelectedPlace}
            onBoundChange={actions.handleCenterChange}
            onRefresh={actions.handleRefresh}
            onMyLocation={actions.handleMyLocation}
          />
        )}

        <div className='p-6'>

          <PlaceListState
            isPending={state.isPending}
            places={state.displayShops}
            onPlaceClick={actions.setSelectedPlace}
          />
        </div>

        <BottomSheet
          isOpen={state.selectedPlace !== null}
          onClose={() => actions.setSelectedPlace(null)}
        >
          {state.selectedPlace && <PlaceDetailSheet place={state.selectedPlace} />}
        </BottomSheet>
      </main>
    </div>
  );
}