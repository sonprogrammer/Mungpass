import { OwnerCompleteWidget } from "@/widgets/owner/auth/ui/OwnerCompleteWidget";
import { Suspense } from "react";

export default function OwnerCompletePage() {
    return (
        // TODO fallbakc 유아이 처리
        <Suspense fallback={<div>로딩중...</div>}>
            <OwnerCompleteWidget />
        </Suspense>
    )
}