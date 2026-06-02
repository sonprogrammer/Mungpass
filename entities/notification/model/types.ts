export type NotificationType = 'checkin' | 'checkout' | 'info'

export interface Notification{
    id: string;
    type: NotificationType
    title: string;
    message: string;
    time: string;
    is_read: boolean
    created_at: string
}

