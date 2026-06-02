import { DailySalesData } from "@/entities/owner/model"

export const calCulateTopRecord = (dailySalesData: DailySalesData[]) => {
    if(!dailySalesData || dailySalesData.length === 0){
        return[
            { id: 1, label: '최고 매출일', value: '-', subValue: '데이터 없음' },
            { id: 2, label: '최다 방문일', value: '-', subValue: '데이터 없음' },
            { id: 3, label: '평균 객단가', value: '₩0', subValue: '체크인 1건 기준' },
        ]
    }

    const topSalesDay = [...dailySalesData].sort((a, b) => b.sales - a.sales)[0]
    const topVisitDay = [...dailySalesData].sort((a, b) => b.visits - a.visits)[0]

    const totalMonthlySales = dailySalesData.reduce((acc, cur) => acc + cur.sales,0)
    const totalMonthlyVisits = dailySalesData.reduce((acc, cur) => acc + cur.visits,0)

    const avgPerPrice = totalMonthlySales > 0 ? Math.round(totalMonthlySales/totalMonthlyVisits) : 0

    return [
        { 
            id: 1, 
            label: '최고 매출일', 
            value: topSalesDay.date.slice(5).replace('-', '.'), 
            subValue: `₩${topSalesDay.sales.toLocaleString()}` 
        },
        { 
            id: 2, 
            label: '최다 방문일', 
            value: topVisitDay.date.slice(5).replace('-', '.'), 
            subValue: `${topVisitDay.visits}마리` 
        },
        { 
            id: 3, 
            label: '평균 객단가', 
            value: `₩${avgPerPrice.toLocaleString()}`, 
            subValue: '체크인 1건 기준' 
        },
    ]
    
}