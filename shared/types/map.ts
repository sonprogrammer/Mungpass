
export interface Coords{
    lat: number;
    lon: number;
}

export interface KakaoPlace{
    id: string;
    place_name: string;
    category_name: string;
    address_name: string;
    road_address_name: string;
    category_group_name: string;
    phone: string;
    x: string; //경도
    y: string; // 위도
    place_url: string;
    distance: string;
}

export interface MapProps{
    center: Coords,
    places: KakaoPlace[];
    onMarkerClick: (place: KakaoPlace) => void;
}