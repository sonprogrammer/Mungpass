import { AdminRoleGuard } from "@/features/auth/ui/admin/AdminRoleGuard";
import { AdminAppProvider } from "@/shared/ui/AdminAppProvider";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <AdminRoleGuard>
      <AdminAppProvider>
        {children}
      </AdminAppProvider>
    </AdminRoleGuard>
  );
}
