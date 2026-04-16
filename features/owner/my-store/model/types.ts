import { Dispatch, SetStateAction } from "react";

export interface ScheduleRow{
    shop_id: string;
    day_of_week: number; //0~6까지 일~토
    open_time: string 
    close_time: string
    is_closed: boolean; //휴무
}

export interface SaveScheduleValues{
    open: Date
    close: Date
    is_closed: boolean;
}

export type SaveScheduleFormData = Record<number, SaveScheduleValues>



export interface CurrentStoreStatus {
    schedule?: ScheduleRow;
    status: string;
    reason?: string;
    start_date?: string;
    end_date?: string;
}

export interface VactationFromDB{
    id: string;
    reason: string;
    shop_id: string;
    start_date: string;
    end_date: string;
    updaated_at: string;
}

export interface StoreTimeMainViewProps{
    shopStatus: CurrentStoreStatus
    onEditClick: () => void
    shopId: string
    vacation: VactationFromDB
}

export interface VacationSubmitData {
    start_date: string;
    end_date: string;
    reason: string;
    updated_at: string;
}
export interface VacationModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: VacationSubmitData) => void;
}

export interface UpdateVacationToServer {
    shop_id: string;
    start_date: string;
    end_date: string;
    reason: string;
    updated_at: string;
}

export interface EarlyCloseConfirmModalProps{
    tempType: 'SHUTDOWN' | 'EARLY_CLOSE' | null
    open: boolean
    onClose: () => void
    onConfirm: () => void 
    reason: string; 
    setReason: Dispatch<SetStateAction<string>>
}