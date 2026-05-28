import { getAdminInquiryNoti } from "@/entities/inquiry/api/getAdminInquiryNoti";
import { useQuery } from "@tanstack/react-query";

export function useGetAdminInquiryNoti() {
    return useQuery({
        queryKey: ['inquiry-noti-admin'],
        queryFn: getAdminInquiryNoti
    })
}