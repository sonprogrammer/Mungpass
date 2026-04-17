import { PlaceDetailSheet } from "@/features/user/shopInfo/ui/PlaceDetailSheet";
import { StoreDetailWidgetProps } from "@/features/user/shopInfo/model/types";
import { BottomSheet } from "@/shared/ui/place/BottomSheet";

export function StoreDetailBottomSheet({selectedPlace, onClose} : StoreDetailWidgetProps) {
    return (
        <BottomSheet
            isOpen={selectedPlace !== null}
            onClose={onClose}
        >
            {selectedPlace && <PlaceDetailSheet place={selectedPlace} />}
        </BottomSheet>
    )
}