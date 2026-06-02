import { LoadingFallback } from "@/shared/ui/Loader";
import { KakaoScriptProvider } from "@/shared/ui/map";
import { MapLoading } from "@/widgets/around/ui";
import { RegisterContent } from "@/widgets/owner/ui";
import { Suspense } from "react";



export default function OwnerStoreRegisterPage() {
    return (
        <Suspense fallback={<LoadingFallback text="데이터 불러오는 중..."/>}>
            <KakaoScriptProvider
                fallback={<MapLoading message="지도 준비중입니다." />}
            >
                <RegisterContent />
            </KakaoScriptProvider>
        </Suspense>
    )
}