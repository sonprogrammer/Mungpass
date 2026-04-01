export type RegistrationStatus = 	'PENDING'| 'APPROVED'| 'REJECTED'

export interface StoreRegistration{
        id: string;
        owner_id: string;
        store_name: string;
        biz_reg_image_url: string | null;
        rejection_reason: string | null;
        status: RegistrationStatus;
        created_at: string; //신청일=제출일
        updated_at: string; //관리자가 승인해준일
        business_number: string;
}

export interface MyStoreHeaderProps {
    regisData: StoreRegistration;
}