import { MenuPageListCard } from "@/widgets/home-menu/ui/MenuPageListCard";
import { Heart, MapPin, PawPrint, Store } from "lucide-react";

export default function FavoritesPage() {
    // 나중에 API로 대체
    const favorites = [
        {
            id: 1,
            name: "가까이 그리고 가만히",
            address: "충남 천안시 동남구 통정10로 17-1",
            visitCount: 5,
        },
        {
            id: 2,
            name: "멍멍이 놀이터",
            address: "충남 천안시 서북구 불당동",
            visitCount: 3,
        },
        {
            id: 3,
            name: "멍멍이 놀이터",
            address: "충남 천안시 서북구 불당동",
            visitCount: 3,
        },
        {
            id: 4,
            name: "멍멍이 놀이터",
            address: "충남 천안시 서북구 불당동",
            visitCount: 3,
        },
        {
            id: 5,
            name: "멍멍이 놀이터",
            address: "충남 천안시 서북구 불당동",
            visitCount: 3,
        },
        {
            id: 6,
            name: "멍멍이 놀이터",
            address: "충남 천안시 서북구 불당동",
            visitCount: 3,
        },
        {
            id: 7,
            name: "멍멍이 놀이터",
            address: "충남 천안시 서북구 불당동",
            visitCount: 3,
        },
    ];

    return (


        <main className="h-full bg-[#FFFBEB] flex flex-col ">

            <header className="p-6 w-full max-w-120 mx-auto shrink-0">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    단골 멍패스
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    우리 아이가 자주 가는 곳이에요 💕
                </p>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-120 mx-auto">
                <div className="p-6 space-y-4 pb-24">

                    {favorites.map((item) => (
                        <MenuPageListCard
                            key={item.id}
                            icon={<Heart className="w-5 h-5 text-orange-500" />}
                            title={item.name}
                            description={item.address}
                            subText={`방문 횟수: ${item.visitCount}`}
                        />
                    ))}

                </div>
            </div>

        </main>

    );
}
