'use client'

import { Info, Loader2 } from "lucide-react";
import { KakaoPlace } from "@/shared/model/map";
import { PlaceList } from "@/entities/place/ui/PlaceList";
import { NoResult } from "@/shared/ui/NoResultUI";


interface ShopListStateProps {
    isPending: boolean;
    places: KakaoPlace[];
    onPlaceClick: (place: KakaoPlace) => void;
}

export function PlaceListState({ isPending, places, onPlaceClick }: ShopListStateProps) {
    //* 로딩
    if (isPending) {
        return (
            <div className="mt-10 flex flex-col items-center justify-center p-10 bg-white rounded-4xl border border-orange-50/50">
                <Loader2 className="w-6 h-6 text-orange-200 animate-spin mb-2" />
                <p className="text-xs text-slate-400 font-medium">가까운 장소를 찾는 중...</p>
            </div>
        );
    }

    //* 결과 없음
    if (places.length === 0) {
        return (
            <NoResult title="주변에 멍패스 존이 없어요" description={
                                                        <>다른 지역으로 이동하거나<br /> 
                                                        검색범위를 넓혀보세요
                                                        </>} 
            />
        );
    }

    //* 결과 반환
    return (
        <PlaceList 
            places={places} 
            placeClick={onPlaceClick} 
        />
    );
}