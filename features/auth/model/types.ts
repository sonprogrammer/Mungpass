import { KakaoPlace } from "@/shared/model/map";

export interface AuthTabProps{
    isLogin: boolean
    setIsLogin: (value: boolean) => void
}


export interface SignupFieldsProps{
    name: string;
    setName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    emailStatus: 'idle' | 'invalid' | 'checking' | 'available' | 'taken',
    setEmailStatus: (status: 'idle' | 'invalid' | 'checking' | 'available' | 'taken') => void;
    phone: string;
    setPhone: (val: string) => void;
    passwords: {
        password: string;
        confirm: string;
    };
    setPasswords: React.Dispatch<React.SetStateAction<{
        password: string;
        confirm: string;
    }>>
    isMatch: boolean;
    handleEmailCheck: () => void;
}

export interface SignupFormProps{
    role: 'user' | 'owner';
    handleAuthAction?: (formData: FormData) => void | Promise<void>
}

export interface LoginFormProps{
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
}

export interface StoreSearchWidgetProps{
    setKeyword: (val: string) => void;
    searchValue: string;
    setSearchValue: (val: string) => void;
}

export interface StepStatusProps{
    title: string;
    desc: string;
    done?: boolean;
    active?: boolean
}

export interface SkipConfirmModalProps{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface RegisterStoreCheckCardProps{
    place_name?: string;
    address_name?: string;
    phone?: string;
}

export interface postOwnerDocsProps{
    storeInfo: KakaoPlace
    businessNumber: string;
    DocsImg: File;
}