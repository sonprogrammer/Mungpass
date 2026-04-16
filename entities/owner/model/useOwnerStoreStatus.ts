import { create } from "zustand";

interface OwnerStoreState{
    isVerified: boolean;
    setIsVerified: (val: boolean) => void
}


export const useOwnerStoreStatus = create<OwnerStoreState>((set) => ({
    isVerified: false,
    setIsVerified: (val) => set({ isVerified: val})
}))