import { StatsDataToAi } from "@/features/owner/stats/model/types"


export const getAiInsight = async(statsData: StatsDataToAi) => {
    const res = await fetch('/api/ai-insight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({statsData})
    })

    if(!res.ok){
        throw new Error('Ai Insight error')
    }

    const data = await res.json()
    return data.insight
}