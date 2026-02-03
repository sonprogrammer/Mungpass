import { Bound, Coords } from "@/shared/types/map";


export const getCenterFromBound = (bound: Bound): Coords => ({
    lat: (bound.sw.lat + bound.ne.lat) / 2,
    lon: (bound.sw.lon + bound.ne.lon) / 2
})