'use client'



export function StoryTimer ({ progress, imageUrl, isOverTime }: { progress: number, imageUrl: string, isOverTime: boolean }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius

  const strokeDash = circumference - (progress * circumference)

  return (
    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="absolute w-full h-full -rotate-90">
                {/* 배경 원 */}
                <circle cx="40" cy="40" r={radius} stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
                {/* 진행 원 */}
                <circle 
                    cx="40" cy="40" r={radius} 
                    stroke={isOverTime ? "#ef4444" : "#f97316"} 
                    strokeWidth="4" fill="transparent"
                    strokeDasharray={circumference}
                    style={{ strokeDash, transition: 'stroke-dashoffset 0.5s ease' }}
                    strokeLinecap="round"
                />
            </svg>
            <img src={imageUrl} className="w-[52px] h-[52px] rounded-full object-cover" alt="" />
        </div>
  )
}