import { KakaoPlace } from "@/shared/model/map";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


interface StoreRegisterState {
    ownerId: string | null;
    selectedPlace: KakaoPlace | null;
    setSelectedPlace: (place: KakaoPlace | null) => void;
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void;
    reset: () => void;
}

export const useStoreRegistrationStore = create<StoreRegisterState>()(
    persist(
        (set) => ({
            ownerId: null,
            selectedPlace: null,
            hasHydrated: false,
            setSelectedPlace: (place) => set({ selectedPlace: place }),
            setHasHydrated: (state) => set({hasHydrated: state}),
            reset: () => set({ selectedPlace: null }),
        }),
        {
            name: 'store-registration',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            }
        }
    )
)