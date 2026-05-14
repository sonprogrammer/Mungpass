import { PlaceDetailSheet } from "@/features/user/shopInfo/ui/PlaceDetailSheet";
import { BottomSheet } from "@/shared/ui/place/BottomSheet";
import { useSelectedPlace } from "@/features/search-shop/model/useSelectedPlace";

export function StoreDetailBottomSheet() {
    const selectedPlace = useSelectedPlace(state => state.selectedPlace)
    const setSelectedPlace = useSelectedPlace(state => state.setSelectedPlace)
    
    return (
        <BottomSheet
            isOpen={selectedPlace !== null}
            onClose={() => setSelectedPlace(null)}
        >
            {selectedPlace && <PlaceDetailSheet place={selectedPlace} key={selectedPlace.id}/>}
        </BottomSheet>
    )
}