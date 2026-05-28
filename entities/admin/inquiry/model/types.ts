import { InquiryCategory } from "@/entities/inquiry/model/types";

// 문의방 타입
export interface InquiryRoom {
    id: string;
    user_id: string;
    title: string;
    status: "pending" | "completed";
    created_at: string;
    category: InquiryCategory;
}

// 메시지 타입
export interface InquiryMessage {
    id: string;
    room_id: string;
    sender_id: string;
    sender_type: string; //이건 관리자용이라 admin만 쓰면 됨 일반, 사장 유저는 'user' | 'owner'로 갈ㄹ미 
    message: string;
    created_at: string;
}

// * 관리자에서 사용자가 사장이면 가게 정보를 가져오기 위함
export interface Shop {
    id: string;
    kakao_place_id: string;
    owner_id: string;
    status: string;
    name: string;
    address: string;
    shops_phone: string;
    business_number: string;
    licence_image_url: string;
    created_at: string;
    updated_at: string;
    licence_submitted_at: string | null;
    manual_status: string | null;
    vacation_start_at: string | null;
    vacation_end_at: string | null;
    kiosk_pin: string | null;
    kiosk_enabled: boolean;
    is_member: boolean;
}

// *관리자에서 사용자의 정보를 가져오기 위함 
export interface Profile {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    avatar_url: string | null;
    role: 'user' | 'owner' | 'admin';
    join_date: string;
    mungpass_active: boolean;
    business_number: string | null;
    store_name: string | null;
    biz_reg_image: string | null;
    subscribe_status:
        | 'NOT_STARTED'
        | 'PENDING'
        | 'APPROVED'
        | 'REJECTED';
    shop?: Shop[] | null;
}

export interface InquiryRoomWithProfile extends InquiryRoom {
    profile: Profile;
}