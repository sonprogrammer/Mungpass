import { KakaoPlace } from "@/shared/model/map";

export const searchShops = (keyword: string): Promise<KakaoPlace[]> => {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
            return reject(new Error("window is undefined (SSR)"))
          }

        if(!window.kakao.maps.services){
            return reject(new Error('kakao map is not loadiong'))
        }

        const ps = new window.kakao.maps.services.Places()

        ps.keywordSearch(keyword, (data, status) => {
            if(status === window.kakao.maps.services.Status.OK){
                const cafeForDog = data.filter(place => 
                    place.place_name.includes('애견') || 
                    place.place_name.includes('반려') ||
                    place.category_name.includes('애견') ||
                    place.category_name.includes('반려동물')
                )
                resolve(cafeForDog as KakaoPlace[])
            }else if(status === window.kakao.maps.services.Status.ZERO_RESULT){
                resolve([])
            }else{
                reject(new Error('error occured'))
            }
        })
    })
}