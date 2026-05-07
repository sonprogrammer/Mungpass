import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo";
import { checkout } from "@/features/qr/owner/api/checkout";
import { formatMinsToTime } from "@/shared/utils/formatMinsToTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";

export function usePostCheckout() {
    const queryClient = useQueryClient()
    const { data: shopInfo } = useGetShopInfo()
    const shopId = shopInfo?.id

    const {message, modal} = App.useApp()

    return useMutation({
        mutationFn: checkout,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['currentLogs', shopId] })
            queryClient.invalidateQueries({ queryKey: ['statsData', shopId] })

            if (res.extraCharge > 0) {
                modal.info({
                    title: '퇴실 및 정산 안내',
                    centered: true,
                    content: (
                        <div>
                            <p className="text-lg font-bold text-orange-600">
                                추가 요금 {res.extraCharge.toLocaleString()}원이 발생했습니다.
                            </p>
                            <p className="text-sm text-slate-500">
                                초과 시간: {formatMinsToTime(res.overTimeMins)}분
                            </p>
                            <p className="mt-2">현장에서 추가 결제를 진행해 주세요.</p>
                        </div>
                    ),
                    okText: '확인',
                });
            } else {
                message.success('정상 시간 내 퇴실 처리가 완료되었습니다.');
            }
            
        },
        onError: (error) => {
            console.error('usePostCheckout hooks error', error)
            message.error('퇴실 처리 실패, 다시 시도햊주세요')
        }
    })
}