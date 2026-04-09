import { supabaseClient } from "@/shared/api/supabase/client"
import { endOfMonth, format, parseISO, startOfMonth } from "date-fns"

export const getDailySalesData = async (shopId: string, selectedMonth: string) => {

    const baseDate = parseISO(`${selectedMonth}-01`)
    const startDate = format(startOfMonth(baseDate), 'yyyy-MM-dd 00:00:00')
    const endDate = format(endOfMonth(baseDate), 'yyyy-MM-dd 23:59:59')
    const { data, error } = await supabaseClient.from('usage_logs')
        .select(`
                                            started_at,
                                            status,
                                            product: product_id (
                                                price
                                            )
                                        `)
        .eq('shop_id', shopId)
        .gte('started_at', startDate)
        .lte('started_at', endDate)
        .order('started_at', { ascending: true })

    if (error || !data) {
        console.error('getDailySalesData failed', error)
        return []
    }

    console.log('data from sales', data)


    const salesMap = data?.reduce((acc: Record<string, { sales: number, visits: number }>, cur) => {
        const productInfo = Array.isArray(cur.product) ? cur.product[0] : cur.product
        if (cur.status === 'completed' && productInfo) {
            const dateKey = format(parseISO(cur.started_at), 'yyyy-MM-dd')

            if (!acc[dateKey]) {
                acc[dateKey] = { sales: 0, visits: 0 }
            }

            const price = productInfo.price || 0


            acc[dateKey].sales += price
            acc[dateKey].visits += 1
        }
        return acc

    }, {}) || {}



    return Object.entries(salesMap).map(([date, stats]) => ({
        date,
        sales: stats.sales,
        visits: stats.visits
    }))
}