'use client'

import { useUserStore } from "@/entities/user/model/useUserStore"
import { useGetMyDogs } from "@/features/dog/model/useGetMyDogs"

export function DogSelectStep() {
    // shopId, productId, setSelectedDogId 를 props로 받아오고 사용해야함 
    //여기서 강아지 선택하는 곳임
    
    const myDogs = useGetMyDogs()
    


    
    return(
        <div>
            DogSelectStep
        </div>
    )
}