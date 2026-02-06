import { ChevronRight } from "lucide-react";

export function MenuItem({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick?: () => void }) {
    return (
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 bg-white rounded-[1.8rem] border border-orange-50/50 shadow-sm active:scale-[0.98] transition-all">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-slate-50 rounded-2xl group-hover:scale-110">
            {icon}
          </div>
          <span className="text-[15px] font-black text-slate-700 tracking-tight">{title}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300" />
      </button>
    );
  }