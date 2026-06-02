import { BusinessStoreSubmitInfo } from "@/features/auth/model";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


interface StoreRegisterState {
    ownerId: string | null; 
    selectedPlace: BusinessStoreSubmitInfo | null;
    setSelectedPlace: (place: BusinessStoreSubmitInfo | null) => void;
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void;
    reset: () => void;
}

// * 사업자 등록하는곳에서 새로고침되도 유지되기 위해서 persist함
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