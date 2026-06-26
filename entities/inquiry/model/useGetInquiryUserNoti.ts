
import { getInquiryUserNoti } from "@/entities/inquiry/api";
import { useQuery } from "@tanstack/react-query";

export function useGetInquiryUserNoti(userId: string) {
    return useQuery({
        queryKey: ['inquiry-user-noti', userId],
        queryFn: async() => {
           const res = await getInquiryUserNoti(userId)
           if(!res.success) throw new Error(res.message)
            return res.data
        },
        enabled: !!userId
    })
}