import { OwnerAuthWidget } from "@/widgets/owner/auth/ui/OwnerAuthWidget";
import { Suspense } from "react";

export default function OwnerAuthPage() {
    return(
        // TODO 스켈레톤으로 구성
        <Suspense fallback={<div>인증 정보를 불러오는 중입니다...</div>}>
            <OwnerAuthWidget />
        </Suspense>
    )
}