import { FetchShopsRes } from "@/features/search-shop/model/types"
import { Bound, Coords, KakaoPlace } from "@/shared/model/map"
import { getCenterFromBound } from "@/shared/utils/map"

export const fetchNearByShops = (radius: number, newBound?: Bound | null): Promise<FetchShopsRes> => {
    return new Promise((resolve, reject) => {

        if (!window.kakao?.maps?.services) {
            return reject(new Error('kakao is not loading'));
        }
        const ps = new window.kakao.maps.services.Places()
        const searchWithCoords = (coords: Coords) => {
            if(!window.kakao.maps.services){
                return reject(new Error('kakao is not loading'))
            }

            ps.keywordSearch('애견 카페', (res, status) => {
                if(status === window.kakao.maps.services.Status.OK){
                    resolve({center: coords, places: res as KakaoPlace[]})
                }else if(status === window.kakao.maps.services.Status.ZERO_RESULT){
                    resolve({center: coords, places: []})
                }else{
                    reject(new Error('search failed'))
                }
            },{
                location: new window.kakao.maps.LatLng(coords.lat, coords.lon),
                radius,
                category_group_code: 'CE7',
                sort: window.kakao.maps.services.SortBy.DISTANCE
            }
        )
        }

        const boundResponse = (res: kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status, currentCenter: Coords) => {
            if(status === window.kakao.maps.services.Status.OK){
                resolve({ center: currentCenter, places: res as KakaoPlace[]})
            }else if(status === window.kakao.maps.services.Status.ZERO_RESULT){
                resolve({center: currentCenter, places: []})
            }else{
                reject(new Error('search failed'))
            }
        }

        if(newBound){
            const calculatedCoordsFromBound = getCenterFromBound(newBound)

            ps.keywordSearch('애견 카페', (res, status) => boundResponse(res,status, calculatedCoordsFromBound),{
                bounds: new window.kakao.maps.LatLngBounds(
                    new window.kakao.maps.LatLng(newBound.sw.lat, newBound.sw.lon),
                    new window.kakao.maps.LatLng(newBound.ne.lat, newBound.ne.lon)
                ),
                category_group_code: 'CE7'
            } )
            return
        }

        if(!navigator.geolocation){
            return reject(new Error('geolocation is not surporting'))
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude}
            searchWithCoords(coords)
        }, reject)
    })
}