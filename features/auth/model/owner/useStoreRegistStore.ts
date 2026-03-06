import { KakaoPlace } from "@/shared/model/map";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

// interface SelectedPlace{
//     id: string;
//     place_name: string;
//     address_name: string;
//     category_name: string; //"음식점 > 카페 > 테마카페 > 애견카페" 이런식으로 나옴
//     phone: string;
//     x: string;
//     y: string;
// }

interface StoreRegisterState {
    selectedPlace: KakaoPlace | null;
    setSelectedPlace: (place: KakaoPlace | null) => void;
    reset: () => void;
}

export const useStoreRegistrationStore = create<StoreRegisterState>()(
    persist(
        (set) => ({
            selectedPlace: null,
            setSelectedPlace: (place) => set({ selectedPlace: place }),
            reset: () => set({ selectedPlace: null }),
        }),
        {
            name: 'store-registration-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)