

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
    handleKeywordChange: (val: string) => void;
}

export interface StepStatusProps{
    title: string;
    desc: string;
    done?: boolean;
    active?: boolean
    isError?: boolean
    date?: string
}

export interface SkipConfirmModalProps{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface RegisterStoreCheckCardProps{
    place_name?: string;
    address_name?: string;
    phone?: string
    isEdit?: boolean;
    ownerId?: string;
}

export interface postOwnerDocsProps{
    ownerId: string;
    storeInfo: BusinessStoreSubmitInfo
    businessNumber: string;
    DocsImg: File;
}


export interface BusinessStoreSubmitInfo{
    id: string; //카카오 아이디
    place_name: string;
    category_name: string;
    address_name: string;
    phone: string;
    x: string; //경도
    y: string; // 위도
}