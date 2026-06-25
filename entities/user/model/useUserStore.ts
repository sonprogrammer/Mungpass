import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin' | 'owner';
  munpass_active: boolean;
  join_date: string;
}

export interface ProfileCardProps {
  user: UserProfile | null
}

export interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  needSignup: boolean;
  setNeedSignup: (value: boolean) => void;
  isLoggingIn: boolean;
  setIsLoggingIn: (val: boolean) => void
  loginTabRole: 'user' | 'owner',
  setLoginTabRole: (role: 'user' | 'owner') => void,
  setProfile: (profile: UserProfile | null) => void;
  logout: () => void;
  resetLoginTabRole: () => void
  isHydrated: boolean
  setHydrated: (state: boolean) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      isLoading: true,
      needSignup: false,
      isLoggingIn: false,
      setNeedSignup: (value) => set({ needSignup: value }),
      setIsLoggingIn: (val) => set({ isLoggingIn: val }),
      loginTabRole: 'user',
      setLoginTabRole: (role) =>
        set({ loginTabRole: role }),

      setProfile: (profile) =>
        set({ profile, isLoading: false }),

      logout: () =>
        set({
          profile: null,
          isLoading: false,
          needSignup: false,
        }),
      resetLoginTabRole: () =>
        set({
          loginTabRole: 'user'
        }),
      isHydrated: false,
      setHydrated: (state) => set({isHydrated: state}),
    }),
    {
      name: 'user-store',

      partialize: (state) => ({
        loginTabRole: state.loginTabRole,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      }
    }
  )
)