
import { getInquiryRoom } from "@/entities/inquiry/api";
import { GetInquiryRoomParams } from "@/entities/inquiry/model";
import { useQuery } from "@tanstack/react-query";

export function useGetInquiryList(userData: GetInquiryRoomParams) {
    return useQuery({
        queryKey: ['inquiry-list', userData],
        queryFn: async () => {
            const res = await getInquiryRoom(userData)
            if (!res.success) throw new Error(res.message)
            return res.data

        },
        enabled: !!userData.userId && !!userData.userType,
        staleTime: 1000 * 60 * 5
    })
}