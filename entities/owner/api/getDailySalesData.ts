import { supabaseClient } from "@/shared/api/supabase/client"
import { format, parseISO } from "date-fns"

export const getDailySalesData = async (shopId: string) => {
    const { data, error } = await supabaseClient.from('usage_logs')
        .select(`
                                            started_at,
                                            status,
                                            product: product_id (
                                                price
                                            )
                                        `)
        .eq('shop_id', shopId)
        .order('started_at', { ascending: true })

    if (error || !data) {
        console.error('getDailySalesData failed', error)
        return []
    }

    console.log('data from getDailySalesData:', data)

    const salesMap = data?.reduce((acc: Record<string, { sales: number, visits: number }>, log) => {
        const productInfo = Array.isArray(log.product) ? log.product[0] : log.product
        if (log.status === 'completed' && productInfo) {
            const dateKey = format(parseISO(log.started_at), 'yyyy-MM-dd')

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