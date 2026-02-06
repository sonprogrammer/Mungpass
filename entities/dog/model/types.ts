import { create } from "zustand";

export interface Dog{
    id: string;
    name: string;
    weight: number;
    imageUrl?: string;
    status: boolean; //강아지가 멍패스 가게 있으면 true, 없으면 false(쉬고있다고 표시), 
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