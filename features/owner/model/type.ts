type TabKey = 'current' | 'checkout'

export interface UsageTabsProps{
    activeTab: string;
    onChange: (tab: TabKey) => void;
    currentCount: number;
    checkoutCount: number;
}