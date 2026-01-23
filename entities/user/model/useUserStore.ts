import { create } from "zustand";

export interface UserProfile{
    id: string;
    nickname: string;
    email: string;
    phone_number: string | null;
    avatar_url: string | null;
    role: 'user' | 'admin' | 'owner';
    munpass_active: boolean;
    join_date: string;
}

export interface UserState {
    profile: UserProfile | null;
    isLoading: boolean;
    setProfile: (profile: UserProfile | null) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    profile: null,
    isLoading: true,
    setProfile: (profile) => set({profile, isLoading: false}),
    logout: () => set({profile: null, isLoading: false})
}))