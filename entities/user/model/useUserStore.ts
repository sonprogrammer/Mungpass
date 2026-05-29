import { create } from "zustand";

export interface UserProfile{
    id: string;
    name: string;
    email: string;
    phone_number: string | null;
    avatar_url: string | null;
    role: 'user' | 'admin' | 'owner';
    munpass_active: boolean;
    join_date: string;
}

export interface ProfileCardProps{
    user: UserProfile | null
}

export interface UserState {
    profile: UserProfile | null;
    isLoading: boolean;
    needSignup: boolean;
    setNeedSignup: (value: boolean) => void;
    loginTabRole: 'user' | 'owner',
    setLoginTabRole: (role: 'user' | 'owner') => void,
    setProfile: (profile: UserProfile | null) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    profile: null,
    isLoading: true,
    needSignup: false,
    setNeedSignup: (value) => set({needSignup: value}),
    loginTabRole: 'user',
    setLoginTabRole: (role) => set({loginTabRole: role}),
    setProfile: (profile) => set({profile, isLoading: false}),
    logout: () => set({profile: null, isLoading: false, needSignup: false})
}))