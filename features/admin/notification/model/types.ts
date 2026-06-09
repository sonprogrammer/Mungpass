export interface InquiryNotification {
    id: string
    room_id: string
    user_id: string
    type: 'inquiry_new_req' | 'inquiry_res'
    title: string
    message: string
    is_read: boolean
    created_at: string
}