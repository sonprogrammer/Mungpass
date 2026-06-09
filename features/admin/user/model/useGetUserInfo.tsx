import { getUserInfo } from "@/features/admin/user/api";
import { useQuery } from "@tanstack/react-query";

//*enabled는 검색용모달에서 전체 데이터를 가져오는 서버 낭비 자원을 위해 옵션을 추가해줌
export function useGetUserInfo(params: {keyword?: string,role?: string,ownerStatus?: string, enabled?: boolean}) {
    
    return useQuery({
        queryKey: ['userInfo', params],
        queryFn: () => getUserInfo(params),
        staleTime: 1000 * 60 * 3,
        gcTime: 1000 * 60 * 6,
        enabled: params.enabled ?? true
    })
}