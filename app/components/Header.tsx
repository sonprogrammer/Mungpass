'use client'

import { Trophy } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100 sticky top-0 z-50">
    <Link href='home'>
      <h1 className="text-xl font-bold tracking-tight text-slate-900">
        Plan <span className="text-blue-600">ALLIANCE</span>
      </h1>
    </Link>
      <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1.5">
        <Trophy className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-bold text-blue-700">Grade D</span>
      </div>
    </header>
  );
}