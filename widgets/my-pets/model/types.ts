
import { MyPetUsageAllInfo } from "@/features/qr/model"

export interface CheckedInWidgetProps {
    activeDogs: MyPetUsageAllInfo[]
    onDogClick: (usage: MyPetUsageAllInfo) => void
}

export interface MyPetsEmptyViewProps {
    onRegisterClick: () => void
}