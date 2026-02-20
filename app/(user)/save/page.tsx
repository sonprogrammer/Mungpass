import { BackBtn } from "@/shared/ui/BackBtn";
import { SaveList } from "@/widgets/save/ui/SaveList";




export default function FavoritesPage() {

    return (


        <main className="h-full bg-[#FFFBEB] flex flex-col ">

            <header className="relative p-6 w-full max-w-120 mx-auto shrink-0 flex items-center justify-center mt-2">
                <div className="absolute left-6">
                    <BackBtn />
                </div>
                <div className="flex flex-col items-center text-center">

                    <h1 className="text-2xl font-extrabold text-slate-800">
                        단골 멍패스
                    </h1>
                </div>
            </header>

            <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-120 mx-auto ">
                <SaveList />
            </div>

        </main>

    );
}
