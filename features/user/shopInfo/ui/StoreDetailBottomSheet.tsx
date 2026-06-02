import { PlaceDetailSheet } from "@/features/user/shopInfo/ui";
import { BottomSheet } from "@/shared/ui/place";
import { useSelectedPlace } from "@/features/search-shop/model";

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