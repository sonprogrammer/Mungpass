import { SaveList } from "@/widgets/save/ui/SaveList";




    export default function FavoritesPage() {
       
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

                <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-120 mx-auto ">
                    <SaveList />
                </div>

            </main>

        );
    }
