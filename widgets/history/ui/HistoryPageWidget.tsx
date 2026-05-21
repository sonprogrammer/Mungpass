'use client'

import { useGetMyPetUsage } from "@/features/qr/model/useGetMyPetUsage";
import { BackBtn } from "@/shared/ui/BackBtn";
import { MenuPageListCard } from "@/widgets/home-menu/ui/MenuPageListCard";
import { format, parseISO } from "date-fns";
import { PawPrint } from "lucide-react";


export function HistoryPageWidget() {
    const { data: historyList = [], isPending } = useGetMyPetUsage({ statuses: ['completed'] }) //*이용완료된 기록만 보임





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
                    {isPending ? (
                        <div className="p-6 space-y-6">
                            <div className="animate-pulse bg-gray-50 rounded-3xl h-22 w-full" />
                            <div className="animate-pulse bg-gray-50 rounded-2xl h-22 w-full" />
                        </div>
                    ) : historyList.length > 0 ? (

                        historyList.map((item) => (
                            <MenuPageListCard
                                key={item.id}
                                icon={<PawPrint className="w-5 h-5 text-orange-500" />}
                                title={item.shop.name}
                                description={item.product.name}
                                subText={format(parseISO(item.created_at), 'yy-MM-dd')}
                            />
                        ))

                    ) :
                        (
                            <div className="text-center py-20">
                                <PawPrint className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400">아직 이용 기록이 없어요.</p>
                            </div>
                        )
                    }
                </div>
            </div>

        </main>

    );
}
