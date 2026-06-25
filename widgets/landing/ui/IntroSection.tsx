import { BigLogo } from "@/shared/ui";

export function IntroSection() {
    return (
        <section className="h-full w-full flex items-center justify-center text-center bg-amber-50">
            <BigLogo />
            <h1>멍패스에 오신 것을 환영합니다!</h1>
            <p>반려견과 함께하는 가장 스마트한 방법.</p>
        </section>
    )
}