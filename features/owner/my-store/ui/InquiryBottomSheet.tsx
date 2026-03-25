import { StoreInquiryCard } from "@/features/owner/my-store/ui/StoreInquiryCard";
import { BottomSheet } from "@/shared/ui/place/BottomSheet";

export function InquiryBottomSheet({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    return(
        <BottomSheet isOpen={isOpen} onClose={onClose}>

            <StoreInquiryCard />
        </BottomSheet>
    )
}