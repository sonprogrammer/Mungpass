import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/shared/api/supabase/server"
import { format } from "date-fns"


const geminiAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
    try {

        const supabase = await supabaseServer()

        const { data: { session } } = await supabase.auth.getSession()



        if (!session) {
            return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 })
        }

        const { statsData } = await req.json()
        const shopId = statsData.shop_id
        const today = format(new Date(), 'yyyy-MM-dd')

        //* 이미 ai리포트를 받았는지 확인
        const { data: existingInsight } = await supabase.from('store_ai_insight').select('*').eq('shop_id', shopId).eq('created_at', today).single()

        // * 유료 회원인지 아닌지 확인
        const { data: shopInfo } = await supabase.from('shops').select('is_member').eq('id', shopId).single()

        // *무료이고 이미 리포트를 받았다면 ai호출안해야함
        if (!shopInfo?.is_member && existingInsight) {
            return NextResponse.json({ insight: existingInsight.content }, { status: 200 })
        }


        const model = geminiAi.getGenerativeModel({ model: 'gemini-3-flash-preview' })

        const prompt = `
            너는 애견 카페/유치원 전문 경영 분석가야.
            아래의 이번 달 통계 데이터를 보고 사장님에게 보내는 분석 인사이트를 작성해줘.

            [데이터]
            - 이번 달 총 매출 : ${statsData.total_sales.toLocaleString()}원
            - 지난 달 동기 대비 매출은 : ${statsData.prev_sales.toLocaleString()}원
            - 이번 달 총 체크인 : ${statsData.total_visits}건
            - 지난 달 동기 대비 체크인 : ${statsData.prev_visits}건
            - 이번 달 일 평균 방문 : ${statsData.avg_visits}마리
            - 이번 달 최고 매출일 : ${statsData.top_day}
            - 이번 달 최다 방문일 : ${statsData.top_visits}
            - 이번 달 객단가 : ${statsData.avg_per_price}

            [조건]
            1. 사장님이 읽기 편하게 친절하고 전문적인 말투로 작성해.
            2. 딱 2~3문장으로 아줄 짧고 강렬하게 요약해.
            3. 데이터에 기반해서 구체적인 성과난 주의점을 언급해줘
            4. 대한민국 공휴일, 주말은 너가 알아서 데이터랑 맞춰서 분석해줘
        `

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const { error: aiInsightUpsertError } = await supabase.from('store_ai_insight').upsert({
            shop_id: shopId,
            content: text, created_at: today
        })

        if (aiInsightUpsertError) {
            console.error('db에 ai 인사이트 저장 에러 api error', aiInsightUpsertError)
        }


        return NextResponse.json({ insight: text }, { status: 200 })
    } catch (error) {
        console.error('Gemini API Error', error)
        return NextResponse.json({ error: '분석 실패' }, { status: 500 })
    }
}