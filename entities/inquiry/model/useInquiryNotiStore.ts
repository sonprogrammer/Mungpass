import { InquiryNoti } from "@/entities/inquiry/model/types";
import { create } from "zustand";


interface InquiryNotiState{
    notifications: InquiryNoti[]
    setNotifications: (noti: InquiryNoti[]) => void
    addNotifications: (noti: InquiryNoti) => void
    removeNotifications: (id: string) => void
    markAsRead: (id: string) => void
    clearNotifications: () => void
}

export const useInquiryNotiStore = create<InquiryNotiState>((set) => ({
    notifications: [],
    setNotifications: (notifications) => set({notifications}),
    addNotifications: (notification) => set((state) => {
        const isDuplicate = state.notifications.some((n) => n.id === notification.id)
        if(isDuplicate) return state
        return { notifications: [notification, ...state.notifications] }
    }),
    removeNotifications: (id) => set((state) => ({notifications: state.notifications.filter((n) => n.id !== id)})),
    markAsRead: (id) => set((state) => ({notifications: state.notifications.map((n) => n.id === id ? {...n, is_read: true} : n)})),
    clearNotifications: () => set({notifications: []})
}))