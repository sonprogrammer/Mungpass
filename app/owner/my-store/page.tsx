import { MyStoreHeader } from "@/widgets/owner/my-store/ui/MyStoreHeader";
import { StoreApprovalStatusCard } from "@/widgets/owner/my-store/ui/StoreApprovalStatusCard";
import { StoreDocCard } from "@/widgets/owner/my-store/ui/StoreDocCard";
import { StoreInquiryCard } from "@/widgets/owner/my-store/ui/StoreInquiryCard";
import { StoreNoticeCard } from "@/widgets/owner/my-store/ui/StoreNoticeCard";
import { StoreTimeCard } from "@/widgets/owner/my-store/ui/StoreTimeCard";

export default function MyStorePage() {
    return(
        <div className="h-screen">
            <div className="mx-auto flex flex-col gap-6">
                <MyStoreHeader />

                <section className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <StoreTimeCard />

                        <StoreNoticeCard />

                        <StoreInquiryCard />
                    </div>

                    <div className="flex flex-col gap-6">
                        <StoreApprovalStatusCard />

                        <StoreDocCard />
                    </div>
                </section>
            </div>
        </div>
    ) 
}