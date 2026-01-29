import { KakaoPlace } from "@/shared/types/map";

export interface PlaceListProps{
    places: KakaoPlace[]
    placeClick: (place: KakaoPlace) => void
}

export interface AroundHeaderProps{
    showMap: boolean 
    toggle: () => void
}