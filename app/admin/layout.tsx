import { AdminRoleGuard } from "@/features/auth/ui/admin";
import { AdminAppProvider } from "@/shared/ui";


export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <AdminAppProvider>
      <AdminRoleGuard>
        {children}
      </AdminRoleGuard>
    </AdminAppProvider>
  );
}
