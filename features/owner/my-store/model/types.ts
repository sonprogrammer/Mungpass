import { FormInstance } from "antd";

export interface ScheduleRow{
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
    updated_at: string;
}

export interface StoreTimeMainViewProps{
    shopStatus: CurrentStoreStatus
    onEditClick: () => void
    shopId: string
    vacation?: VactationFromDB
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
    shopId: string;
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
    shopId: string;
    open: boolean
    onClose: () => void
}

export interface StoreTimeEditViewProps{
    form: FormInstance<SaveScheduleFormData>
    onSave: (values: SaveScheduleFormData) => void | Promise<void>
    onBack: () => void
    loading: boolean
}