'use client';

import { MenuPageListCardProps } from "../model/types";

export function MenuPageListCard({
  icon,
  title,
  description,
  subText,
  onClick,
}: MenuPageListCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[2.5rem] p-5 border border-orange-50 shadow-sm
                 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">
          {icon}
        </div>

        <div className="flex-1">
          <p className="font-bold text-slate-800">
            {title}
          </p>

          {subText && (
            <p className="text-xs text-slate-400 mt-1">
              {subText}
            </p>
          )}

          {description && (
            <p className="text-sm text-slate-500 mt-1">
              {description}
            </p>
          )}

       
            
        </div>
      </div>
    </div>
  );
}
