import { EditDogBtnProps } from "@/features/dog/model"

// TODO 현재 안쓰고 있음

export function EditDogBtn({onClick}: EditDogBtnProps) {
    return(
        <button
            onClick={onClick}
            className="px-4 py-2 bg-orange-400 text-white rounded-full text-sm font-semibold"
        >
            강아지 등록 / 수정
        </button>
    )
}