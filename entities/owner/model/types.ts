import { CurrentUsageLog } from "@/entities/check-in/model/types";

// TODO 이건 store_products에서 상품명에 따라 다를 수 있음 아래는 임시 목업으로 처리해논거임
export type UsageType = '유치원' | '호텔' | '놀이방';

export interface CurrentLog {
    id: string;
    petName: string;
    petImage?: string | null;
    breed: string;
    type: string;
    startTime: string;
    duration: string;
    ownerName?: string;
    status?: '이용중' | '대기중';
}
//*db는 강이지마다 아이디, 주인아이디,  주인이름, 강아지 이름, 종류,무게, 생일, 강아지 프로필, 설명(특이사항등이있음)
//TODO 주인아이디로 주인 폰번호 이런것도 가져오면됨

export interface CurrentLogItemProps {
    item: CurrentUsageLog;
    onCheckout?: (item: CurrentUsageLog) => void
    onClick: (item: CurrentUsageLog) => void
}


export interface CurrentLogDetailModalProps{
    open: boolean;
    item: CurrentUsageLog | null;
    onClose: () => void;
    onCheckout?: (item: CurrentUsageLog) => void;
}

export interface StatsDataFromServer{
        avg_visits: number;
        prev_avg_visits: number;
        prev_sales: number;
        prev_visits: number;
        total_sales: number;
        total_visits: number;
}

export interface DailySalesData{
    date: string;
    sales: number;
    visits: number;
}

export interface MonthlySalesData{
    month: string;
    sales: number;
    visits: number;
}

