
//*안쓰는 타입임
export interface EditDogBtnProps{
    onClick: () => void;
}

export interface DogRegisterModalProps{
    isOpen: boolean;
    onClose?: () => void;
}