
import { KakaoScriptProvider } from "@/shared/ui/map/KakaoScriptProvider"
import { MapLoading } from "@/widgets/around/ui/MapLoading"
import { RegisterContent } from "@/widgets/owner/ui/RegisterStoreWidget"




export default function OwnerStoreRegisterPage() {
    return (
        <>
            <KakaoScriptProvider
                fallback={<MapLoading message="지도 준비중입니다." />}
            >
                <RegisterContent />
            </KakaoScriptProvider>
        </>
    )
}