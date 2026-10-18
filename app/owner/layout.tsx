import { requireRole } from "@/features/auth/lib/server/requireRole";
import { OwnerStoreStatusGuard } from "@/features/auth/ui/owner";
import { AntdAppProvider } from "@/shared/ui";
import { OwnerHeader } from "@/widgets/header/ui";
import { OwnerNavbar } from "@/widgets/owner/ui";



export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
 await requireRole('owner')
  return (
    <AntdAppProvider>


      <div className="flex justify-center bg-slate-200 h-dvh">
        <div className="w-full max-w-120 bg-white h-full flex flex-col relative shadow-2xl overflow-hidden">
          <OwnerHeader />

          <main className={`flex-1 bg-stone-50 overflow-y-auto scrollbar-none`}>
            <div className='h-full'>
                {/* //* 1차가드 매장 심사상태별 라우팅 처리 */}
                <OwnerStoreStatusGuard>
                  {children}
                </OwnerStoreStatusGuard>
            </div>
          </main>

          <div className="bg-stone-50 w-full shrink-0">
            <OwnerNavbar />
          </div>

        </div>
      </div>
    </AntdAppProvider>
  )
}