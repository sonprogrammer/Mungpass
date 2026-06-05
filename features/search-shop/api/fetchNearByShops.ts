import { FetchShopsRes } from "@/features/search-shop/model"
import { Bound, Coords, KakaoPlace } from "@/shared/model"
import { getCenterFromBound } from "@/shared/utils"


//* ip 기반 주소 찾기 - 백업
// const getIPLocation = async (): Promise<Coords> => {
//     try {
//         const res = await fetch('https://ipapi.co/json/')
//         const data = await res.json()
//         return { lat: data.latitude, lon: data.longitude }
//     } catch {
//         return { lat: 37.5665, lon: 126.9780 }
//     }
// }

// const getLocationWithFallback = (): Promise<Coords> => {
//     return new Promise((resolve) => {
//         if (!navigator.geolocation) {
//             getIPLocation().then(resolve)
//             return
//         }
//         navigator.geolocation.getCurrentPosition(
//             (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
//             async (err) => {
//                 console.warn('geolocation 실패, IP 기반으로 시도:', err)
//                 const coords = await getIPLocation()
//                 resolve(coords)
//             },
//             { timeout: 5000, enableHighAccuracy: false }
//         )
//     })
// }


export const fetchNearByShops = (radius: number, newBound?: Bound | null): Promise<FetchShopsRes> => {
    return new Promise((resolve, reject) => {

        if (!window.kakao || !window.kakao.maps) {
            return reject(new Error('Kakao Maps SDK is not loaded'));
        }
        window.kakao.maps.load(() => {
            if (!window.kakao?.maps?.services) {
                return reject(new Error('kakao is not loading'));
            }
            const ps = new window.kakao.maps.services.Places()
            const searchWithCoords = (coords: Coords) => {
                if (!window.kakao.maps.services) {
                    return reject(new Error('kakao is not loading'))
                }

                ps.keywordSearch('애견 카페', (res, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        resolve({ center: coords, places: res as KakaoPlace[] })
                    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                        resolve({ center: coords, places: [] })
                    } else {
                        reject(new Error('search failed'))
                    }
                }, {
                    location: new window.kakao.maps.LatLng(Number(coords.lat.toFixed(6)), Number(coords.lon.toFixed(6))),
                    radius,
                    category_group_code: 'CE7',
                    sort: window.kakao.maps.services.SortBy.DISTANCE
                }
                )
            }

            const boundResponse = (res: kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status, currentCenter: Coords) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    resolve({ center: currentCenter, places: res as KakaoPlace[] })
                } else {
                    resolve({ center: currentCenter, places: [] })
                }
                // else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                //     resolve({ center: currentCenter, places: [] })
                // } else {
                //     reject(new Error('search failed'))
                // }
            }

            if (newBound) {
                const calculatedCoordsFromBound = getCenterFromBound(newBound)

                ps.keywordSearch('애견 카페', (res, status) => boundResponse(res, status, calculatedCoordsFromBound), {
                    bounds: new window.kakao.maps.LatLngBounds(
                        new window.kakao.maps.LatLng(newBound.sw.lat, newBound.sw.lon),
                        new window.kakao.maps.LatLng(newBound.ne.lat, newBound.ne.lon)
                    ),
                    category_group_code: 'CE7'
                })
                return
            }
            // getLocationWithFallback().then(searchWithCoords) //* ip기반 현재 위치 찾기 
            if (!navigator.geolocation) {
                return reject(new Error('geolocation is not surporting'))
            }
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude }
                searchWithCoords(coords)
            },
                (err) => {
                    console.warn("위치 정보 실패, 기본값으로 검색:", err);
                    const defaultCoords = { lat: 37.5665, lon: 126.9780 };
                    searchWithCoords(defaultCoords);
                },
                { timeout: 5000 })
        })
    })
}