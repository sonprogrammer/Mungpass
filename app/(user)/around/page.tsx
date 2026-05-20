import { KakaoScriptProvider } from "@/shared/ui/map/KakaoScriptProvider";
import { AroundAllContent } from "@/widgets/around/ui/AroundAllContent";
import { MapLoading } from "@/widgets/around/ui/MapLoading";


export default function AroundPage() {

  return (
    <KakaoScriptProvider
      fallback={<MapLoading message="지도 준비중입니다."/>}
    >
      <AroundAllContent />
    </KakaoScriptProvider>
  )
}