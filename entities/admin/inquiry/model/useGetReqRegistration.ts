import { getReqRegistrations } from "@/entities/admin/inquiry/api/getReqRegistrations";
import { useQuery } from "@tanstack/react-query";

export function useGetReqRegistration() {
    return useQuery({
        queryKey: ['Req-Regi'],
        queryFn: async() => {
           const res = await getReqRegistrations()
           if(!res.success) throw new Error(res.message)
            return res.data
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 20
    })
}