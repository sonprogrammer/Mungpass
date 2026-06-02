import { KakaoPlace } from "@/shared/model";


export interface ShopListStateProps {
    isPending: boolean;
    places: KakaoPlace[];
    onPlaceClick: (place: KakaoPlace) => void;
}