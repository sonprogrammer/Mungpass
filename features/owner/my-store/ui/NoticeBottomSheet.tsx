import { useGetShopInfo } from "@/entities/owner/model";
import { StoreNoticeCard } from "@/features/owner/my-store/notices/ui";
import { BottomSheet } from "@/shared/ui/place";


export function NoticeBottomSheet({ open, onClose }: { open: boolean, onClose: () => void }) {
    const {data:shopInfo} = useGetShopInfo()
    const shopId = shopInfo?.id
    
    return(
        <BottomSheet isOpen={open} onClose={onClose}>
            <StoreNoticeCard shopId={shopId}/>
        </BottomSheet>
    )
}