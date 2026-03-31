

import { LucideIcon } from 'lucide-react';

export interface StatsHeaderCardProps {
    toggle: () => void;
    openSummary: boolean;
    months: string[];
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
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
}

export interface HighestRecordsProps{
    topDays: TopDays[]
}