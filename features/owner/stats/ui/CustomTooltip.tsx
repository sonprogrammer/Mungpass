import { CustomTooltipProps } from '@/features/owner/stats/model';
import { format } from 'date-fns';

export const CustomTooltip = ({ active, payload, tab }: CustomTooltipProps) => {

    if (active && payload && payload.length) {

        const data = payload[0]
        const label = tab === 'daily' ? 
            format(data.payload.date, 'MM.dd')
            : 
            `${data.payload.date.split('-')[0]}년 ${data.payload.date.split('-')[1]}월`


        return (
            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                <p className="text-[10px] font-bold text-gray-400 mb-1">
                    {label}
                </p>
                <p className="text-sm font-black text-gray-900">
                    {data.payload?.sales?.toLocaleString()}원
                </p>
                <p className="text-[11px] font-medium text-orange-500">
                    {data.payload?.visits}건의 체크인
                </p>
            </div>
        );
    }
    return null;
};