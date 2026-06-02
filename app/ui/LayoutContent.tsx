'use client';


import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from "@/entities/user/ui";



dayjs.extend(relativeTime)
dayjs.extend(isBetween)
dayjs.locale("ko")

export default function LayoutContent({ children }: { children: React.ReactNode }) {




  return (
    <AuthProvider>

        {children}
        <Toaster position='top-center' reverseOrder={false} />

    </AuthProvider>
  );
}