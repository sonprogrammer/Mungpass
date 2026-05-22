import { KakaoPlace } from "@/shared/model/map";

export interface ShopListStateProps {
    isPending: boolean;
    places: KakaoPlace[];
    onPlaceClick: (place: KakaoPlace) => void;
}