'use client';

import { usePathname } from "next/navigation";
import Header from "@/widgets/header/ui/Header";
import Navbar from "@/widgets/navbar/ui/Navbar";
import { AuthProvider } from "@/entities/user/ui/AuthProvider";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  return (
    <AuthProvider>

      <div className="flex justify-center bg-slate-200 min-h-screen">
        <div className="w-full max-w-120 bg-white min-h-screen flex flex-col relative shadow-2xl">
          {!isAuthPage && <Header />}

          <main className={`flex-1 ${!isAuthPage ? "pb-24" : ""}`}>
            {children}
          </main>

          {!isAuthPage && <Navbar />}
        </div>
      </div>
    </AuthProvider>
  );
}