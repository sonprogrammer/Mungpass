import { getUserFromServer } from "@/entities/user/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUserFromServer() {
    return useQuery({
        queryKey: ['login-user'],
        queryFn: getUserFromServer
    })
}