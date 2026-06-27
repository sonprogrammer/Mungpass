import { KakaoScriptProvider } from "@/shared/ui/map";
import { MapLoading } from "@/widgets/around/ui";
import { RegisterContent } from "@/widgets/owner/ui";



export default function OwnerStoreRegisterPage() {
    return (
        <KakaoScriptProvider
            fallback={<MapLoading message="지도 준비중입니다." />}
        >
            <RegisterContent />
        </KakaoScriptProvider>
    )
}