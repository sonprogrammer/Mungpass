import { Vacations } from '@/features/owner/model/type';
import { ScheduleRow } from '@/features/owner/my-store/model/types';
import { NoticeFromDb } from '@/features/owner/my-store/notices/model/types';
import { KakaoPlace } from "@/shared/model/map";

export interface StoreDetailWidgetProps {
    onClose: () => void
}

export interface TodayShopStatusInfo {
    status: string;
    isPending: boolean
    schedule?: ScheduleRow
    reason?: string;
    start_date?: string;
    end_date?: string
}

export interface StoreDetailActionBtnsProps {
    isMungPassPartner: boolean
    isPending: boolean
    isOpen: boolean
    todayShopStatus: string
    place: KakaoPlace
    isScheduleOpen: boolean
    onClick: () => void
    toggleSave: (place:KakaoPlace) => void;
    isLiked: boolean
    storeNotices: NoticeFromDb[]
}

export interface StoreScheduleInfoProps{
    onClose: () => void;
    schedules?: ScheduleRow[]
    vacation: Vacations
    todayShopStatus: TodayShopStatusInfo;
}

