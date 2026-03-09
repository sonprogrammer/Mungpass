import { KakaoPlace } from "@/shared/model/map";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


interface StoreRegisterState {
    ownerId: string | null;
    selectedPlace: KakaoPlace | null;
    setSelectedPlace: (place: KakaoPlace | null) => void;
    reset: () => void;
}

export const useStoreRegistrationStore = create<StoreRegisterState>()(
    persist(
        (set) => ({
            ownerId: null,
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