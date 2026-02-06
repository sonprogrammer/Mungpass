import { Bound, Coords, KakaoPlace } from "@/shared/model/map";

export interface MapSectionProps{
    center: Coords;
    places: KakaoPlace[];
    showRefreshBtn: boolean;
    onMarkerClick: (place: KakaoPlace) => void;
    onBoundChange: (bound: Bound) => void;
    onRefresh: () => void;
    onMyLocation: () => void;
}