import { LoadingFallback } from "@/shared/ui/Loader";
import { OwnerCompleteWidget } from "@/widgets/owner/auth/ui";
import { Suspense } from "react";


export default function OwnerCompletePage() {
    return (
        <Suspense fallback={<LoadingFallback text="데이터 불러오는 중..."/>}>

            <OwnerCompleteWidget />
        </Suspense>
    )
}