import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from "@/entities/user/ui";
import { getUserFromServer } from "@/entities/user/api";



// dayjs.extend(relativeTime)
// dayjs.extend(isBetween)
// dayjs.locale("ko")

export default async function LayoutContent({ children }: { children: React.ReactNode }) {
  const user = await getUserFromServer()


  return (
    <AuthProvider initialUser={user}>

        {children}
        <Toaster position='top-center' reverseOrder={false} />

    </AuthProvider>
  );
}