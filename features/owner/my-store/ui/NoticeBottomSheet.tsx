import { StoreNoticeCard } from "@/features/owner/my-store/ui/StoreNoticeCard";
import { BottomSheet } from "@/shared/ui/place/BottomSheet";


export function NoticeBottomSheet({ open, onClose }: { open: boolean, onClose: () => void }) {
    return(
        <BottomSheet isOpen={open} onClose={onClose}>
            <StoreNoticeCard />
        </BottomSheet>
    )
}