'use client'

import { useTimer } from "@/entities/check-in/lib/useTimer"
import { StoryTimer } from "@/entities/check-in/ui/StoryTimer"
import { MyPetUsageAllInfo } from "@/features/qr/model/types"

export function UsageStoryList({usageDog, onClick}: {usageDog: MyPetUsageAllInfo, onClick: () => void}){
    const { progress, isOverTime} = useTimer(usageDog.started_at, usageDog.expected_ended_at, usageDog.ended_at)

    return(
        <div className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
            onClick={onClick}
        >
            <StoryTimer 
                progress={progress}
                imageUrl={usageDog.dog.image_url}
                isOverTime={isOverTime}
            />
            <span className="text-[11px] font-black tracking-tight">
                {usageDog.dog.name}
            </span>

        </div>
    )
}