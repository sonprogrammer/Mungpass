'use client';


import { AroundHeader } from '@/widgets/around/ui/AroundHeader';
import { PlaceListState } from '@/entities/place/ui/PlaceListState';
import { useAroundState } from '@/widgets/around/model/useAroundState';
import MapSection  from '@/widgets/around/ui/MapSection';
import { StoreDetailBottomSheet } from '@/features/user/shopInfo/ui/StoreDetailBottomSheet';

export default function AroundPage() {
  const { state, actions } = useAroundState()
  
  return (
    <div className="bg-[#FFFBEB] h-screen pb-24">

      <AroundHeader
        showMap={state.showMap}
        toggle={actions.handleToggleMap}
        onSearch={actions.setKeyword}
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

        
        <StoreDetailBottomSheet 
          selectedPlace={state.selectedPlace}
          onClose={() => actions.setSelectedPlace(null)}
        />
      </main>
    </div>
  );
}