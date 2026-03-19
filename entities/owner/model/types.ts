export type UsageType = '유치원' | '호텔' | '놀이방';

export interface CurrentLog {
    id: string;
    petName: string;
    petImage?: string | null;
    breed: string;
    type: UsageType;
    startTime: string;
    duration: string;
    ownerName?: string;
    status?: '이용중' | '대기중';
}

export interface CurrentLogItemProps {
    item: CurrentLog;
    onCheckout?: (item: CurrentLog) => void
}

// id: '2',
// petName: '보리',
// petImage: '',
// breed: '말티즈',
// type: '호텔' as const,
// startTime: '09:40',
// duration: '3시간 00분',
// status: '이용중' as const,
// ownerName: '이민수',