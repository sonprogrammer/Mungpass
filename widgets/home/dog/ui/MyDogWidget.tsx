'use client'

import { DogCard } from "@/entities/dog/ui/DogCard"
import { Dog } from "@/entities/dog/model/types"
import { useState } from "react"
import { useRouter } from "next/navigation"


export function MyDogWidget() {
    const [dog, setDog] = useState<Dog[] | null>(null)
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
    const router = useRouter()

    const handleEdit = () => {
        //* 애견을 등록한게 있으면 수정 및 추가 모달, 등록한적이 없으면 등록 페이지로 이동
        if(!dog){
            router.push('/pet-register')
        }else{
            setEditModalOpen(true)
        }
        console.log('수정 버튼 클릭')
    }
    
    return(
        <DogCard dog={dog} onEdit={handleEdit} />
    )
}