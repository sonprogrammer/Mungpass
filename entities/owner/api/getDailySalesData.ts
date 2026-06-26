'use server'

import { supabaseServer } from '@/shared/api/supabase/server';
import { endOfMonth, format, parseISO, startOfMonth } from "date-fns"
import { DailySalesData } from '@/entities/owner/model';
import { ApiRes } from '@/shared/model';


export const getDailySalesData = async (shopId: string, selectedMonth: string): Promise<ApiRes<DailySalesData[]>> => {
    try {
        const supabase = await supabaseServer()

        const baseDate = parseISO(`${selectedMonth}-01`)
        const startDate = format(startOfMonth(baseDate), 'yyyy-MM-dd 00:00:00')
        const endDate = format(endOfMonth(baseDate), 'yyyy-MM-dd 23:59:59')
        const { data, error } = await supabase.from('usage_logs')
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
            throw error
        }

        const salesMap = data.reduce<Record<string, DailySalesData>>((acc, cur) => {
            const productInfo = Array.isArray(cur.product)
                ? cur.product[0]
                : cur.product;

            if (cur.status !== "completed" || !productInfo) {
                return acc;
            }

            const dateKey = format(parseISO(cur.started_at), "yyyy-MM-dd");

            if (!acc[dateKey]) {
                acc[dateKey] = {
                    date: dateKey,
                    sales: 0,
                    visits: 0,
                };
            }

            acc[dateKey].sales += productInfo.price ?? 0;
            acc[dateKey].visits += 1;

            return acc;
        }, {})


        return { success: true, data: Object.values(salesMap) }

    }



    // const salesMap = data?.reduce((acc: Record<string, { sales: number, visits: number }>, cur) => {
    //     const productInfo = Array.isArray(cur.product) ? cur.product[0] : cur.product
    //     if (cur.status === 'completed' && productInfo) {
    //         const dateKey = format(parseISO(cur.started_at), 'yyyy-MM-dd')

    //         if (!acc[dateKey]) {
    //             acc[dateKey] = { sales: 0, visits: 0 }
    //         }

    //         const price = productInfo.price || 0


    //         acc[dateKey].sales += price
    //         acc[dateKey].visits += 1
    //     }
    //     return acc

    // }, {}) || {}

    catch (error) {
        console.error('getDailySalesData failed', error)
        return {
            success: false,
            message: "일별 매출 데이터를 불러오지 못했습니다.",
        }
    }
}