export type NotificationType = 'checkin' | 'checkout' | 'info'

export interface Notification{
    id: number | string;
    type: NotificationType
    title: string;
    message: string;
    time: string;
    isRead: boolean

    // userId: string
    // createdAt: string
}