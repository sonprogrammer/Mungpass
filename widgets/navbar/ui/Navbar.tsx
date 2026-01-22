'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, User, PawPrint } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: '홈', href: '/home', icon: Home },
    { name: '주변 찾기', href: '/around', icon: Map },
    { name: '나의 멍패스', href: '/mypage', icon: PawPrint }, 
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-120 bg-white/95 backdrop-blur-xl border-t border-orange-50 px-10 py-3 flex justify-between items-center z-50  rounded-t-4xl shadow-[0_-10px_25px_-5px_rgba(249,115,22,0.1)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
          >
            <div className={`p-2 rounded-2xl transition-colors ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-orange-200'}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-black tracking-tight ${isActive ? 'text-orange-600' : 'text-orange-200'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}