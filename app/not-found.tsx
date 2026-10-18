import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="flex min-h-dvh items-center justify-center bg-stone-100 px-5 py-10">
            <div className="relative w-full max-w-120 overflow-hidden rounded-[2.5rem] border border-orange-100 bg-orange-50 px-6 py-14 text-center shadow-sm sm:px-10 sm:py-16">

                <div className=" mx-auto flex flex-col  items-center justify-center">
                    <div className=" ">
                        <Image
                            src="/logo.png"
                            alt="멍패스"
                            width={112}
                            height={112}
                            className="h-28 w-28 object-contain"
                        />
                    </div>

                </div>

                <span aria-hidden="true" className="select-none text-[100px] font-black leading-none tracking-tighter text-orange-100/80">
                    404
                </span>
                <p className="text-xs font-bold tracking-[0.2em] text-orange-600">
                    PAGE NOT FOUND
                </p>
                <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-slate-900">
                    페이지를 찾을 수 없어요
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                    주소가 잘못된 페이지예요.
                    <br />
                    첫 화면에서 다시 시작해 주세요.
                </p>
                <Link
                    href="/"
                    className="mt-9 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange-500! px-5 py-4 text-sm font-bold text-white! transition-colors hover:bg-orange-600! focus-visible:outline-2! focus-visible:outline-offset-4! focus-visible:outline-orange-500! active:bg-orange-700!"
                >
                    돌아가기
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <p className="mt-8 text-xs font-semibold tracking-wide text-stone-400">
                    반려견과 함께하는 일상, 멍패스
                </p>
            </div>
        </main>
    )
}