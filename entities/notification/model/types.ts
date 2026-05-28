export type NotificationType = 'checkin' | 'checkout' | 'info'

export interface Notification{
    id: string;
    type: NotificationType
    title: string;
    message: string;
    time: string;
    is_read: boolean
    created_at: string


    // userId: string
}

// export interface InquiryNoti{
//     id: string;
//     user_id: string;
//     type: 'inquiry_new_req' | 'inquiry_res'; //inquiry_new_req는 문의알림 - 관리자가 읽는거, inquiry_res는 관리자가 답변한거 
//     title: string;
//     message: string;
//     is_read: boolean;
//     created_at: string;
// }