'use client'

import { useGetSaveList, useGetShopIdByKakaoId, useToggleSaveList } from "@/entities/place/model";
import { useGetSchedule, useGetVacation, useShopStatus } from "@/features/owner/my-store/model";
import { useGetNotices } from "@/features/owner/my-store/notices/model";
import { StoreDetailActionBtns, StoreNoticeInfo, StoreScheduleInfo } from "@/features/user/shopInfo/ui";
import { KakaoPlace } from "@/shared/model";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";



export function PlaceDetailSheet({ place }: { place: KakaoPlace }) {
    const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false)
    const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false)
    const { data: saveLists } = useGetSaveList()
    const { mutate: toggleSave } = useToggleSaveList()

    // *카카오id로 매장 uuid값 가져오기(멍패스에 등록되어있는 매장한임) 아닌 것들은 null을 반환
    const { data: shop } = useGetShopIdByKakaoId(place?.id)

    const shopId = shop?.id


    const isMungPassPartner = !!shopId

    const secureKakaoUrl = place.place_url?.replace('http://', 'https://')

    // * 선택된 가게 일주일 스케줄 가져오기
    const { data: shopScedules } = useGetSchedule(shopId)
    // * 선택된 가게의 등록된 휴가 정보 가져오기
    const { data: shopVacation } = useGetVacation(shopId)
    // *선택된 가게의 공지사항 불러오기
    const { data: storeNotices } = useGetNotices(shopId)


    // * 선택된 가게 현재 상태(오늘이 정기 휴일인지, 휴가인지, 갑자기 닫은건지) 가져오기
    const todayShopStatus = useShopStatus(shopId)

    const isOpen = todayShopStatus.status === '영업 중'


    const isLiked = saveLists?.some(list => list.kakao_place_id === place.id)//*여기서 place.id는 카카오아이디임

    // * 휴가가 끝났는지 확인 - 배힝기 모양 표시 위해서
    const isOnVacation = useMemo(() => {
        if(!shopVacation) return false
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const end = new Date(shopVacation.end_date)
        return today <= end
    },[shopVacation])

    const handleScheduleToggle = useCallback(() => setIsScheduleOpen(prev => !prev), [])
    const handleNoticeToggle = useCallback(() => setIsNoticeOpen(prev => !prev), [])

    return (

        <div className="relative space-y-6 h-full flex flex-col w-full">

            {isMungPassPartner && (
                <button
                    title="멍패스 제휴 매장입니다"
                    className="absolute flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-100"
                >
                    <Image src={'/m.png'}
                        alt="로고"
                        width={28}
                        height={28}
                    />
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
                    src={secureKakaoUrl}
                    className="w-full h-full"
                    title="카카오맵 상세정보"
                />
            </div>


                <StoreDetailActionBtns
                    isMungPassPartner={isMungPassPartner}
                    isPending={todayShopStatus.isPending}
                    isOpen={isOpen}
                    todayShopStatus={todayShopStatus.status}
                    onScheduleClick={handleScheduleToggle}
                    onNoticeClick={handleNoticeToggle}
                    place={place}
                    toggleSave={toggleSave}
                    isLiked={!!isLiked}
                    storeNotices={storeNotices || []}
                    isOnVacation={isOnVacation}
                />


            {/* TODO 나중에 어플 확장시 추가하기 - 이용권등록 후 마일리지 적립, 쿠폰, 등급제로 운영가능 */}
            {/* <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black text-sm active:scale-[0.98] transition-all shadow-lg shadow-orange-200">
                멍패스 사용하기
            </button> */}

            {/*//* 매장 스케줄 보는거  */}
            <AnimatePresence>

                {isScheduleOpen && (

                    <StoreScheduleInfo
                        onClose={() => setIsScheduleOpen(false)}
                        schedules={shopScedules}
                        vacation={shopVacation}
                        todayShopStatus={todayShopStatus}
                    />
                )}
            </AnimatePresence>
            {/* //* 매장 공지사항 */}
            <AnimatePresence>
                {isNoticeOpen && (
                    <StoreNoticeInfo
                        onClose={() => setIsNoticeOpen(false)}
                        notices={storeNotices || []}
                    />
                )}
            </AnimatePresence>

        </div>
    )
}