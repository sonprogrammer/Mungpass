


export function StoryTimer ({ progress, imageUrl, isOverTime }: { progress: number, imageUrl?: string, isOverTime: boolean }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius

  const strokeDashoffset = circumference - (progress * circumference)

  return (
    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="absolute w-full h-full -rotate-90">
                <circle cx="40" cy="40" r={radius} stroke="#f1f5f9" strokeWidth="4" fill="transparent" />
                <circle 
                    cx="40" cy="40" r={radius} 
                    className={`${isOverTime ? "text-red-500" : "text-green-500"} transition-colors duration-300`}
                    stroke="currentColor"
                    strokeWidth="4" fill="transparent"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
                    strokeLinecap="round"
                />
            </svg>
            <img src={imageUrl} className="w-[52px] h-[52px] rounded-full object-cover" alt="강아지 프로필사진" />
        </div>
  )
}