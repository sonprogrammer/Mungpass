import { Vacations } from '@/features/owner/model';
import { ScheduleRow } from '@/features/owner/my-store/model';
import { NoticeFromDb } from '@/features/owner/my-store/notices/model';
import { KakaoPlace } from "@/shared/model";

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
    onScheduleClick: () => void
    toggleSave: (place:KakaoPlace) => void;
    isLiked: boolean
    onNoticeClick: () => void;
    storeNotices: NoticeFromDb[] | []
    isOnVacation: boolean
}

export interface StoreScheduleInfoProps{
    onClose: () => void;
    schedules?: ScheduleRow[]
    vacation: Vacations
    todayShopStatus: TodayShopStatusInfo;
}

