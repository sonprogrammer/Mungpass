
import { KakaoScriptProvider } from "@/shared/ui/map/KakaoScriptProvider"
import { MapLoading } from "@/widgets/around/ui/MapLoading"
import { RegisterContent } from "@/widgets/owner/ui/RegisterStoreWidget"
import { Suspense } from "react"



export default function OwnerStoreRegisterPage() {
    return (
        // TODO 스켈레톤으로 바꾸기
        <Suspense fallback={<div className="p-10 text-center">지도를 로딩 중입니다...</div>}>
            <KakaoScriptProvider
                fallback={<MapLoading message="지도 준비중입니다."/>}
            >
                <RegisterContent />
            </KakaoScriptProvider>
        </Suspense>
    )
}