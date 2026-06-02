'use client'

import { useTimer } from "@/entities/check-in/lib"
import { StoryTimer } from "@/entities/check-in/ui/StoryTimer"
import { MyPetUsageAllInfo } from "@/features/qr/model"


export function UsageStoryList({usageDog, onClick}: {usageDog: MyPetUsageAllInfo, onClick: () => void}){
    const { progress, isOverTime} = useTimer({
        startedAt: usageDog.started_at,
        expectedEndAt: usageDog.expected_ended_at,
        endedAt: usageDog.ended_at})

    return(
        <div className="flex flex-col items-center cursor-pointer shrink-0"
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