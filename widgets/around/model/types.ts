import { Bound, Coords, KakaoPlace } from "@/shared/model/map";

export interface MapSectionProps{
    center: Coords;
    places: KakaoPlace[];
    onMarkerClick: (place: KakaoPlace) => void;
    showRefreshBtn: boolean;
    onBoundChange: (bound: Bound) => void;
    onRefresh: () => void;
    onMyLocation: () => void;
}