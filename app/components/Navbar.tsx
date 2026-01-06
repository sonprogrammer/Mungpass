'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, User } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

  const navItems = [
    { name: '홈', href: '/home', icon: Home },
    { name: '프로그램', href: '/programs', icon: MapPin },
    { name: '마이페이지', href: '/mypage', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] bg-white/90 backdrop-blur-lg border-t border-slate-100 px-8 py-3 flex justify-between items-center z-50 pb-6">
      {navItems.map((item) => (
        <Link 
          key={item.href}
          href={item.href} 
          className={`flex flex-col items-center gap-1 ${pathname === item.href ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[10px] font-bold">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}