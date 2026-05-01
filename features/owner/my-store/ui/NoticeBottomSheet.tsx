import { useGetShopInfo } from "@/entities/owner/model/useGetShopInfo";
import { StoreNoticeCard } from "@/features/owner/my-store/notices/ui/StoreNoticeCard";
import { BottomSheet } from "@/shared/ui/place/BottomSheet";


export function NoticeBottomSheet({ open, onClose }: { open: boolean, onClose: () => void }) {
    const {data:shopInfo} = useGetShopInfo()
    const shopId = shopInfo?.id
    
    return(
        <BottomSheet isOpen={open} onClose={onClose}>
            <StoreNoticeCard shopId={shopId}/>
        </BottomSheet>
    )
}