import { KakaoPlace } from "@/shared/model/map"

export interface FetchShopsRes{
    center: {
        lat: number,
        lon: number
    },
    places: KakaoPlace[]
}