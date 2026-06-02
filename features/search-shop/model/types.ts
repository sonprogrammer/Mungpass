import { KakaoPlace } from "@/shared/model"

export interface FetchShopsRes{
    center: {
        lat: number,
        lon: number
    },
    places: KakaoPlace[]
}