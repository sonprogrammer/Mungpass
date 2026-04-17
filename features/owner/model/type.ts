type TabKey = 'current' | 'checkout'

export interface UsageTabsProps{
    activeTab: string;
    onChange: (tab: TabKey) => void;
    currentCount: number;
    checkoutCount: number;
}

export interface Vacations{
    id: string;
    shop_id: string;
    created_at: string;
    end_date: string;
    reason: string;
    start_date: string;
    updated_at: string;
}