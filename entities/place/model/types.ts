import { KakaoPlace } from "@/shared/model/map";

export interface PlaceListProps{
    places: KakaoPlace[]
    placeClick: (place: KakaoPlace) => void
}

export interface AroundHeaderProps{
    showMap: boolean 
    toggle: () => void
    onSearch: (keyword: string) => void
    radius: number;
    setRadius: (radius: number) => void
    onMyLocation: () => void;
}

export interface Favorites {
    id: string;
    user_id: string;
    kakao_place_id: string;
    shop_name: string;
    category_name: string;
    address: string;
    created_at: string;
    place_url: string;
    phone: string | null
}