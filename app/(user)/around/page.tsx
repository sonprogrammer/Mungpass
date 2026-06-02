import { KakaoScriptProvider } from "@/shared/ui/map";
import { AroundAllContent, MapLoading } from "@/widgets/around/ui";



export default function AroundPage() {

  return (
    <KakaoScriptProvider
      fallback={<MapLoading message="지도 준비중입니다."/>}
    >
      <AroundAllContent />
    </KakaoScriptProvider>
  )
}