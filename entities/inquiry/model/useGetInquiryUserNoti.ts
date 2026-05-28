import { getInquiryUserNoti } from "@/entities/inquiry/api/getInquiryUserNoti";
import { useQuery } from "@tanstack/react-query";

export function useGetInquiryUserNoti(userId: string) {
    return useQuery({
        queryKey: ['inquiry-user-noti', userId],
        queryFn: () => getInquiryUserNoti(userId),
        enabled: !!userId
    })
}