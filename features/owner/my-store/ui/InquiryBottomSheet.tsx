import { StoreInquiryCard } from "@/features/owner/my-store/ui";
import { BottomSheet } from "@/shared/ui/place";

export function InquiryBottomSheet({open, onClose}: {open: boolean, onClose: () => void}) {
    return(
        <BottomSheet isOpen={open} onClose={onClose}>

            <StoreInquiryCard />
        </BottomSheet>
    )
}