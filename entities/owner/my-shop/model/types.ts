export type RegistrationStatus = 	'PENDING'| 'APPROVED'| 'REJECTED'

export interface StoreRegistration{
        id: string;
        owner_id: string;
        store_name: string;
        store_id: string;
        biz_reg_image_url: string | null;
        rejection_reason: string | null;
        status: RegistrationStatus;
        created_at: string; //신청일=제출일
        updated_at: string; 
        business_number: string;
        rejected_at: string; //거절 날짜
        approved_at: string; //승인 날짜
        submitted_at: string; //서류 제출일
        expires_at: string; //서류 삭제 예정일 30일 
        discarded_at: string // 서류 삭제일
}

export interface MyStoreHeaderProps {
    regisData: StoreRegistration;
}

export interface RegisteredStoreInfoProps {
    storeName: string;
    status: string;
    todaySales: number;
    accSales: number;
    onDetailClick: () => void;
}