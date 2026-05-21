import { AntdAppProvider } from "@/shared/ui/AntdAppProvider";


export default function KioskLayout({ children }: { children: React.ReactNode }) {
    return (
        <AntdAppProvider>

            <div className="h-screen bg-white text-black overflow-hidden">
                {children}
            </div>
        </AntdAppProvider>
    );
}