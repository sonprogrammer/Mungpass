import { NavItemProps } from "@/widgets/owner/model/type";
import Link from "next/link";

export function NavItem({ href, label, icon: Icon, active }: NavItemProps) {
    return (
        <Link href={href} className="flex flex-col items-center justify-end gap-1">
            <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 ${active
                        ? 'bg-emerald-500 text-emerald-50'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    }`}
            >
                <Icon className="h-5.5 w-5.5" />
            </div>

            <span className={`text-[11px] font-semibold tracking-tight ${active ? 'text-emerald-700' : 'text-slate-400'}`}>
                {label}
            </span>

        </Link>
    )
}