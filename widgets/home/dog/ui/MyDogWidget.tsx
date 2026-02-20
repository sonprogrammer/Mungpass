'use client'

import { DogCard } from "@/entities/dog/ui/DogCard"
import { Dog, useDogStore } from "@/entities/dog/model/types"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation"
import { useUserStore } from "@/entities/user/model/useUserStore"
import { useGetMyDogs } from "@/features/dog/model/useGetMyDogs"
import { MyDogWidgetProps } from "@/widgets/home/model/types";


export function MyDogWidget({dogPostModal, dogViewModal}:MyDogWidgetProps) {
    const router = useRouter()
    const profile = useUserStore(state => state.profile)
    const setSelectedDog = useDogStore(state => state.setSelectedDog)

    const { data: dogs, isPending} = useGetMyDogs(profile?.id)


    //TODO handleEdit 이건 이제 필요가 없음, 우선 확인해보기 
    // const handleEdit = () => {
    //     //* 애견을 등록한게 있으면 마이펫페이지로 이동(수정, 확인 가능), 등록한적이 없으면 모달
    //     if(dogs && dogs.length > 0){
    //         router.push('/my-pets')
    //     }else{
    //         dogPostModal()

    //     }
    //     console.log('수정 버튼 클릭')
    // }

    if (isPending) return <div className="h-24 animate-pulse bg-slate-100 rounded-[2.5rem]" />
    
    if (!dogs || dogs.length === 0) {
        return (
            <div className="bg-white rounded-[2.5rem] p-6 border-2 border-dashed border-orange-100 flex items-center justify-between">
                <div>
                    <p className="text-lg font-bold text-slate-700">
                        강아지를 등록해주세요 
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                        우리 아이 정보를 등록하면 더 편해져요
                    </p>
                </div>

                <button
                    onClick={dogPostModal}
                    className="px-4 py-2 rounded-full bg-orange-400 text-white text-sm font-semibold cursor-pointer"
                >
                    등록
                </button>
            
            </div>
        )
    }
    
    return(
        <div className="my-dog-swiper w-full">
            <Swiper
                modules={[Pagination]}
                spaceBetween={16} 
                slidesPerView={1}
                centeredSlides={true} 
                pagination={{ clickable: true }}
                className="pb-10" 
            >
            
                {dogs.map((dog) => (
                    <SwiperSlide key={dog.id} onClick={()=> {setSelectedDog(dog); dogViewModal()}}>
                        <DogCard dog={dog} />
                    </SwiperSlide>
                ))}

               
                <SwiperSlide>
                    <button
                        onClick={dogPostModal}
                        className="w-full p-10 flex items-center justify-center gap-4 bg-orange-50/50 rounded-[2.5rem] border-2 border-dashed border-orange-200"
                    >
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-400 font-bold shadow-sm">+</div>
                        <span className="font-bold text-orange-400/80">새 식구 등록</span>
                    </button>
                </SwiperSlide>
            </Swiper>

        </div>
    )
}