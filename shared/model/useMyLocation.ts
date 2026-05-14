import { Coords } from '@/shared/model/map';
import { useQuery } from '@tanstack/react-query';
import { App } from 'antd';


export function useMyLocation() {
    const {message} = App.useApp()
    
    return useQuery({
        queryKey: ['myLocation'],
        queryFn: async() => {
            return new Promise<Coords>((res, rej) => {
                if(!navigator.geolocation) return res({ lat: 37.5665, lon: 126.9780 })

                navigator.geolocation.getCurrentPosition(
                    (pos) => res({lat: pos.coords.latitude, lon: pos.coords.longitude}),
                    (err) => {
                        message.error('현재 위치를 불러오지 못해 기본값으로 대체합니다.')
                        console.error('현재 위치 에러', err)
                        res({ lat: 37.5665, lon: 126.9780 })
                    },
                    {enableHighAccuracy: true, timeout: 5000}
                )
            })
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })

}