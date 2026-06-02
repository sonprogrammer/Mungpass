
import { getInquiryMsg } from "@/entities/admin/inquiry/api";
import { useQuery } from "@tanstack/react-query";

export function useGetInquiryMsg(roomId: string) {
    return useQuery({
        queryKey: ['inquiryMessages', roomId],
        queryFn: () => getInquiryMsg(roomId),
        enabled: !!roomId
    })
}