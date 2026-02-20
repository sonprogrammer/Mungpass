import { BackBtn } from "@/shared/ui/BackBtn";
import { MenuPageListCard } from "@/widgets/home-menu/ui/MenuPageListCard";
import { PawPrint, Store } from "lucide-react";


export default function HistoryPage() {
    const historyList = [
        {
            id: 1,
            title: '가까이 그리고 가만히',
            description: '호텔 이용',
            date: '2024.12.23',
        },
        {
            id: 2,
            title: '멍멍 데이케어',
            description: '데이케어 이용',
            date: '2024.12.20',
        },
        {
            id: 3,
            title: '멍멍 데이케어',
            description: '데이케어 이용',
            date: '2024.12.20',
        },
        {
            id: 4,
            title: '멍멍 데이케어',
            description: '데이케어 이용',
            date: '2024.12.20',
        },
        {
            id: 5,
            title: '멍멍 데이케어',
            description: '데이케어 이용',
            date: '2024.12.20',
        },
        {
            id: 6,
            title: '멍멍 데이케어',
            description: '데이케어 이용',
            date: '2024.12.20',
        },
    ]


    return (
        <main className="h-full bg-[#FFFBEB] flex flex-col relative">

            <header className="relative p-6 w-full max-w-120 mx-auto shrink-0 flex items-center mt-2">
                <div className="absolute left-6">
                    <BackBtn />
                </div>
                <div className="flex flex-col w-full items-center">

                    <h1 className="text-2xl font-extrabold text-slate-800">
                        멍패스 기록
                    </h1>
                </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-120 mx-auto">
                <div className="p-6 space-y-4 pb-24">

                    {historyList.map((item) => (
                        <MenuPageListCard
                            key={item.id}
                            icon={<PawPrint className="w-5 h-5 text-orange-500" />}
                            title={item.title}
                            description={item.description}
                            subText={item.date}
                        />
                    ))}

                </div>
            </div>

        </main>

    );
}
