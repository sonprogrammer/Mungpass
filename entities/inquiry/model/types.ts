
export type InquiryCategory = 'payout' | 'policy' | 'system' | 'etc' | 'refund' | 'use_history';
export type UserRoleType = 'user' | 'owner' | 'admin';
export type InquiryStatus = 'pending' | 'completed';


export interface InquiryRoom{
    id: string;
    user_id: string;
    user_type: UserRoleType;
    category: InquiryCategory;
    title: string;
    status: InquiryStatus
    created_at: string;
    updated_at: string;
}

export interface InquiryMessage{
    id: number;
    room_id: string;
    sender_id: string;
    sender_type: UserRoleType
    message: string;
    created_at: string;
}

export interface CreatedInquiryRoomParams{
    userId: string;
    userType: 'user' | 'owner'
    category: InquiryCategory;
    title: string;
    firstMsg: string;
}

export interface GetInquiryRoomParams{
    userId: string;
    userType: 'user' | 'owner'
}

export interface SendInquiryMsgPayload{
    roomId: string;
    senderId: string;
    senderType: UserRoleType
    message: string;
}


export interface InquiryNoti{
    id: string;
    user_id: string;
    type: 'inquiry_new_req' | 'inquiry_res'; //inquiry_new_req는 문의알림 - 관리자가 읽는거, inquiry_res는 관리자가 답변한거 
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}