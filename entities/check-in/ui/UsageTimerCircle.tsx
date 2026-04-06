import { motion } from "framer-motion";
import { useTimer } from "@/features/usage/lib/useTimer";

interface Props {
  image: string
  usage: UsageLog
}

export const UsageTimerCircle = ({ image, usage }: Props) => {
  const { progress, isOverTime, displayTime } = useTimer(usage.check_in_time, usage.total_minutes);
  const circumference = 2 * Math.PI * 45; // 반지름 45 기준 둘레

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="absolute w-full h-full -rotate-90">

        <circle cx="56" cy="56" r="45" stroke="#F1F5F9" strokeWidth="6" fill="none" />
        <motion.circle
          cx="56" cy="56" r="45"
          stroke={isOverTime ? "#EF4444" : "#F97316"} 
          strokeWidth="6"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          fill="none"
          strokeLinecap="round"
          transition={{ type: "spring", stiffness: 50 }}
        />
      </svg>
      
      <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${isOverTime ? 'border-red-200' : 'border-white'} shadow-inner`}>
        <img src={image} alt="dog" className="w-full h-full object-cover" />
      </div>

      {/* 시간 배지 */}
      <div className={`absolute -bottom-2 px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-sm
        ${isOverTime ? 'bg-red-500 animate-pulse' : 'bg-orange-400'}`}>
        {isOverTime ? `초과 ${displayTime}` : displayTime}
      </div>
    </div>
  );
};