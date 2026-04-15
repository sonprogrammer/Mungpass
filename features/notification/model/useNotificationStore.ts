import { create } from 'zustand';
import { Notification } from '@/entities/notification/model/types'

interface NotificationStore {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markAllAsRead: () => void
  markAsRead: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) => 
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markAllAsRead: () => 
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, is_read: true }))
    })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? {...n, is_read: true} : n)
  }))
}));