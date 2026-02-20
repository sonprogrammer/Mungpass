import { Dog } from "@/entities/dog/model/types";
import { UserProfile } from "@/entities/user/model/useUserStore";
import React from "react";

//*안쓰는 타입임
export interface EditDogBtnProps{
    onClick: () => void;
}

export interface DogFormModalProps{
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfile | null
}

export interface DogRegisterForm{
    name: string;
    breed: string;
    weight:  number;
    description: string;
    birth_date: string;
    image_url?: string;
}

export interface DogRegisterToSever{
    name: string;
    breed: string;
    weight: number;
    description: string;
    birth_date: string;
    image_url?: string;
}

export interface DogDetailModalProps{
    isOpen: boolean;
    onClose: () => void;
    directEditMode?: boolean
}

export interface DogFormFieldsProps{
    formData: DogRegisterForm;
    setFormData: (data: DogRegisterForm) => void;
    imagePreview: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>
}