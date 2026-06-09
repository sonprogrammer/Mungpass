import { getUnregisOnwer } from "@/features/admin/store/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUnregisOwner() {
    return useQuery({
        queryKey: ['get-unregist-owner'],
        queryFn: () => getUnregisOnwer()
    })
}