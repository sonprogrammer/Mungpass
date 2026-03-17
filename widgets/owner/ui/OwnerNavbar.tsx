'use client'

import { usePathname } from "next/navigation"
import {
    LayoutGrid,
    Store,
    Settings,
    ClipboardCheck,
    BarChart3
} from "lucide-react"
import Link from "next/link"

export function OwnerNavbar() {
    const pathname = usePathname()

    const navItems = [
        { name: '대시보드', href: '/owner', icon: LayoutGrid },
        { name: '이용현황', href: '/owner/usage', icon: ClipboardCheck },
        { name: '실적통계', href: '/owner/stats', icon: BarChart3 },
        { name: '매장관리', href: '/owner/my-store', icon: Store },
        { name: '설정', href: '/owner/settings', icon: Settings },
    ]

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-120 bg-slate-50/90 backdrop-blur-2xl border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'
                            }`}
                    >
                        <div className={`p-2.5 rounded-2xl transition-all ${isActive
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold tracking-tight ${isActive ? 'text-emerald-700' : 'text-slate-400'
                            }`}>
                            {item.name}
                        </span>
                    </Link>
                );
            })}
        </nav>
    )
}