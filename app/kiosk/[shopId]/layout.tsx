import { App } from "antd";

export default function KioskLayout({ children }: { children: React.ReactNode }) {
    return (
        <App>

            <div className="h-screen bg-white text-black overflow-hidden">
                {children}
            </div>
        </App>
    );
}