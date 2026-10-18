
import { requireRole } from "@/features/auth/lib/server/requireRole";
import { AdminAppProvider } from "@/shared/ui";


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
 await requireRole('admin')
  return (
    <AdminAppProvider>
        {children}
    </AdminAppProvider>
  );
}
