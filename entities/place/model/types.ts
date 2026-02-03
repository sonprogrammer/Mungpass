import { KakaoPlace } from "@/shared/types/map";

export interface PlaceListProps{
    places: KakaoPlace[]
    placeClick: (place: KakaoPlace) => void
}

export interface AroundHeaderProps{
    showMap: boolean 
    toggle: () => void
    onSearch: (keyword: string) => void
    searchValue: string;
    setSearchValue: (search: string) => void
    radius: number;
    setRadius: (radius: number) => void
}