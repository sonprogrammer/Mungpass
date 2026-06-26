

import {  DailySalesData, StatsDataFromServer } from '@/entities/owner/model';
import { LucideIcon } from 'lucide-react';

export interface StatsHeaderCardProps {
    toggle: () => void;
    openSummary: boolean;
    shopId: string;
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
    topDays: TopDays[]
    selectedMonth: string;
    diffData: StatsDataFromServer| undefined
    isPending: boolean
}

export interface HighestRecordsProps{
    topDays: TopDays[]
}

export interface DailyChartProps{
    tab: 'daily' | 'monthly';
    setTab: (tab: 'daily' | 'monthly') => void;
    isVerified: boolean
    shopId: string;
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

export interface CustomTooltipProps{
    active?: boolean
    payload?: {
        payload: {
            date: string, 
            sales: number, 
            visits: number 
        } 
    }[] 
    tab: 'daily' | 'monthly' 
}

export interface DailyStatsChartProps {
    dailyData: DailySalesData[];
    handleNext: () => void
    handlePrev: () => void
    isNextDisabled: boolean
    allMonthlyData: DailySalesData[]

}