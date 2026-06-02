import { KakaoPlace } from "@/shared/model";
import { create } from "zustand";

interface SelectedPlaceState{
    selectedPlace: KakaoPlace | null;
    setSelectedPlace: (place: KakaoPlace | null) => void
    reset: () => void
}

export const useSelectedPlace = create<SelectedPlaceState>()(
    (set) => ({
        selectedPlace: null,
        setSelectedPlace: (place) => set({selectedPlace:place}),
        reset: () => set({selectedPlace: null})
    })
)