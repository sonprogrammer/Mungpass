
import { LoadingFallback } from "@/shared/ui/Loader";
import { OwnerAuthWidget } from "@/widgets/owner/auth/ui";
import { Suspense } from "react";

export default function OwnerAuthPage() {
    return(
        <Suspense fallback={<LoadingFallback text={'인증 정보를 불러오는 중입니다...'}/>}>
            <OwnerAuthWidget />
        </Suspense>
    )
}