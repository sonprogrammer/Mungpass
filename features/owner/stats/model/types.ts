

import { DailySalesData, MonthlySalesData } from '@/entities/owner/model/types';
import { LucideIcon } from 'lucide-react';

export interface StatsHeaderCardProps {
    toggle: () => void;
    openSummary: boolean;
    months: string[];
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
    isVerified: boolean
}



export interface SummaryCards {
    id: number;
    title: string;
    value: string;
    change: string;
    icon: LucideIcon
}

export interface TopDays {
    id: number;
    label: string;
    value: string;
    subValue: string;
}


export interface SummaryCardProps {
    summaryCards: SummaryCards[]
    topDays: TopDays[]
    selectedMonth: string;
}

export interface HighestRecordsProps{
    topDays: TopDays[]
}

export interface DailyChartProps{
    dailyData: DailySalesData[]
    monthlyData: MonthlySalesData[]
    tab: 'daily' | 'monthly';
    setTab: (tab: 'daily' | 'monthly') => void;
    handleNext: () => void;
    handlePrev: () => void;
    isPending: boolean;
    dateRange: string;
    isNextDisabled: boolean;
    isVerified: boolean
}

export interface StatsDataToAi{
    total_sales: number
    prev_sales: number;
    total_visits: number;
    prev_visits: number;
    avg_visits: number;
    top_day: string; //최고 매출일
    top_visits: string; //최다 방문일
    avg_per_price: string;//객단가
    shop_id: string
}