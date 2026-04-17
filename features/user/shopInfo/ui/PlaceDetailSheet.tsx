'use client'

import { useGetSaveList } from "@/entities/place/model/useGetSaveList";
import { useGetShopIdByKakaoId } from "@/entities/place/model/useGetShopIdByKakaoId";
import { useToggleSaveList } from "@/entities/place/model/useToggleSaveList";
import { useGetSchedule } from "@/features/owner/my-store/model/useGetSchedule";
import { useShopStatus } from "@/features/owner/my-store/model/useGetShopStatus";
import { useGetVacation } from "@/features/owner/my-store/model/useGetVacation";
import { StoreDetailActionBtns } from "@/features/user/shopInfo/ui/StoreDetailActionBtns";
import { StoreScheduleInfo } from "@/features/user/shopInfo/ui/StoreScheduleInfo";
import { KakaoPlace } from "@/shared/model/map";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";


export function PlaceDetailSheet({ place }: { place: KakaoPlace }) {
    const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false)
    const { data: saveLists } = useGetSaveList()
    const { mutate: toggleSave } = useToggleSaveList()

    // *카카오id로 매장 uuid값 가져오기(멍패스에 등록되어있는 매장한임)
    const { data: shop } = useGetShopIdByKakaoId(place?.id)

    // console.log('place detail', place)
    // console.log('place shop', shop)



    const shopId = shop?.id
    // console.log('shopid', shopId)
    // console.log('shopId', shopId)
    const isMungPassPartner = !!shopId


    // * 선택된 가게 일주일 스케줄 가져오기
    const { data: shopScedules } = useGetSchedule(shopId)
    // * 선택된 가게의 등록된 휴가 정보 가져오기
    const { data: shopVacation } = useGetVacation(shopId)

    // * 선택된 가게 현재 상태(오늘이 정기 휴일인지, 휴가인지, 갑자기 닫은건지) 가져오기
    const todayShopStatus = useShopStatus(shopId)


    // console.log('shopVacation', shopVacation)
    // console.log('shopScedules', shopScedules)
    // console.log('shopStatus', todayShopStatus)

    const isOpen = todayShopStatus.status === '영업 중'
    // const statusLabel = todayShopStatus.status

    // console.log('shopid', place)


    const isLiked = saveLists?.some(list => String(list.shop_id) === String(place.id))


    return (

        <div className="relative space-y-6 h-full flex flex-col pb-8 w-full">

            {/* TODO 멍패스 아이콘 만들어서 체크 표시 해두기 뱃지로*/}
            {isMungPassPartner && (
                <button
                    title="멍패스 제휴 매장입니다"
                    className="absolute flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-100"
                >
                    <span className="text-sm">🐾</span>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-tight">Partner</span>
                </button>
            )}

            {place.distance && (
                <div className="flex items-center justify-center gap-2 py-2 mb-2 bg-orange-50/50 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                        현재 위치에서 {Number(place.distance) < 1000
                            ? `${place.distance}m`
                            : `${(Number(place.distance) / 1000).toFixed(1)}km`}
                    </p>
                </div>
            )}

            <div className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-100">
                <iframe
                    src={place.place_url}
                    className="w-full h-full"
                    title="카카오맵 상세정보"
                />
            </div>

            <div className="flex gap-3 w-full">

                <StoreDetailActionBtns
                    isMungPassPartner={isMungPassPartner}
                    isPending={todayShopStatus.isPending}
                    isOpen={isOpen}
                    todayShopStatus={todayShopStatus.status}
                    isScheduleOpen={isScheduleOpen}
                    onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                    place={place}
                    toggleSave={toggleSave}
                    isLiked={!!isLiked}
                />
            </div>

            {/* TODO 나중에 어플 확장시 추가하기 - 이용권등록 후 마일리지 적립, 쿠폰, 등급제로 운영가능 */}
            {/* <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-sm active:scale-[0.98] transition-all shadow-lg shadow-orange-200">
                멍패스 사용하기
            </button> */}

            <AnimatePresence>

                {isScheduleOpen && (
                    <div onClick={() => setIsScheduleOpen(false)}>

                        <StoreScheduleInfo
                            onClose={() => setIsScheduleOpen(false)}
                            schedules={shopScedules}
                            vacation={shopVacation}
                            todayShopStatus={todayShopStatus}
                        />
                    </div>
                )}
            </AnimatePresence>

        </div>
    )
}