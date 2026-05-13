import { Coords } from '@/shared/model/map';
import { useQuery } from '@tanstack/react-query';


export function useMyLocation() {
    return useQuery({
        queryKey: ['myLocation'],
        queryFn: async() => {
            return new Promise<Coords>((res, rej) => {
                if(!navigator.geolocation) rej('지도를 불러올 수 없습니다')

                navigator.geolocation.getCurrentPosition(
                    (pos) => res({lat: pos.coords.latitude, lon: pos.coords.longitude}),
                    (err) => rej(err),
                    {enableHighAccuracy: true, timeout: 5000}
                )
            })
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })

}