export default function KioskLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen bg-white text-black overflow-hidden">
            {children}
        </div>
    );
}