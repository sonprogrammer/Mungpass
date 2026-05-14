export type RegistrationStatus = 	'PENDING'| 'APPROVED'| 'REJECTED'

export interface StoreRegistration{
        id: string;
        owner_id: string;
        address_name: string;
        store_name: string;
        store_id: string;
        biz_reg_image_url: string
        kakao_place_id: string;
        x: string;
        y: string;
        rejection_reason: string | null;
        phone: string
        status: RegistrationStatus;
        created_at: string; //신청일=제출일
        category_name: string;
        updated_at: string; 
        business_number: string;
        rejected_at: string; //거절 날짜
        approved_at: string; //승인 날짜
        submitted_at: string; //서류 제출일
        expires_at: string; //서류 삭제 예정일 30일 
        discarded_at: string // 서류 삭제일
        re_submit_at: string; // 서류 재 제출일 
}

export interface MyStoreHeaderProps {
    regisData: StoreRegistration;
    isVerified: boolean
    shopId: string
}

export interface RegisteredStoreInfoProps {
    storeName: string;
    status: string;
    todaySales: number;
    accSales: number;
    onDetailClick: () => void;
    isLoading: boolean
}