import { StoreInquiryCard } from "@/features/owner/my-store/ui/StoreInquiryCard";
import { BottomSheet } from "@/shared/ui/place/BottomSheet";

export function InquiryBottomSheet({open, onClose}: {open: boolean, onClose: () => void}) {
    return(
        <BottomSheet isOpen={open} onClose={onClose}>

            <StoreInquiryCard />
        </BottomSheet>
    )
}