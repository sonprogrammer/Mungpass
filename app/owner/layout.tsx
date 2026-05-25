
import { OwnerRoleGuard } from '@/features/auth/ui/owner/OwnerRoleGuard';
import { OwnerStoreStatusGuard } from '@/features/auth/ui/owner/OwnerStoreStatusGuard';
import { AntdAppProvider } from '@/shared/ui/AntdAppProvider';
import OwnerHeader from '@/widgets/header/ui/OwnerHeader';
import { OwnerNavbar } from '@/widgets/owner/ui/OwnerNavbar';


export default function OwnerLayout({ children }: { children: React.ReactNode }) {

  return (
    <AntdAppProvider>


      <div className="flex justify-center bg-slate-200 h-screen">
        <div className="w-full max-w-120 bg-white h-screen flex flex-col relative shadow-2xl">
          <OwnerHeader />

          <main className={`flex-1 bg-[#fafafa] overflow-y-auto `}>
            <div className='h-full'>
              {/* //* 1차가드 사장님 권환인지 확인 */}
              <OwnerRoleGuard>
                {/* //* 1차가드 매장 심사상태별 라우팅 처리 */}
                <OwnerStoreStatusGuard>
                  {children}
                </OwnerStoreStatusGuard>
              </OwnerRoleGuard>
            </div>
          </main>

          <div className="bg-[#fafafa] w-full shrink-0">
            <OwnerNavbar />
          </div>

        </div>
      </div>
    </AntdAppProvider>
  )
}