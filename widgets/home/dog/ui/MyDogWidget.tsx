'use client'

import { DogCard } from "@/entities/dog/ui/DogCard"
import { Dog } from "@/entities/dog/model/types"
import { useState } from "react"


export function MyDogWidget() {
    const [dog, setDog] = useState<Dog | null>(null)

    const handleEdit = () => {
        // TODO 수정 모달 열기
        
        console.log('수정 버튼 클릭')
    }
    
    return(
        <DogCard dog={dog} onEdit={handleEdit} />
    )
}