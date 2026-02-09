import { create } from "zustand";

export interface Dog{
    id: string;
    name: string;
    weight: number;
    imageUrl?: string;
    status: boolean; //강아지가 멍패스 가게 있으면 true, 없으면 false(쉬고있다고 표시), 
    desciption: string; //강아지 성격, 건강 등 특이사항 적어놓을 수 있는곳
    isPrimary: boolean; //대표 강아지 설정 -> 여러 마리일수 도있으니깐
    birth: Date; //강아지 생일이면 가게에서 이벤트 같은것도 해주게
}

export interface DogCardProps{
    dog: Dog[] | null;
    onEdit: () => void;
}

export interface DogState {
    dog: Dog | null
    setDog: (dog: Dog | null) => void
}

export const useDogStore = create<DogState>((set) => ({
    dog: null,
    setDog: (dog) => set({dog})
}))