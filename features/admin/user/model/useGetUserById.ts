import { getUserInfoById } from "@/features/admin/user/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUserById(userId: string) {
    return useQuery({
        queryKey: ['userInfoById', userId],
        queryFn: () => getUserInfoById(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
    })
}