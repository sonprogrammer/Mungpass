

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

export interface CheckStoreExistsResult {
    exists: boolean
    isPending: boolean
    isRejectedByMe: boolean //내가 신청했다가 반려된 기록인지 확인
    rejectReason?: string // 내가 신청한건데 반려당하여 반려사유가 잇을시
    error?: boolean //에러발생여부 - 두 테이블서 조회 실패시
}

export interface UpdateDocsInfo{
    id: string;
    ownerId: string;
    storeInfo: BusinessStoreSubmitInfo
    businessNumber: string;
    DocsImg: File | string //새로운 파일 아님 기존 디비에 있는 파일 그대로 
}

export interface BusinessFormProps {
    storeInfo: BusinessStoreSubmitInfo;
    ownerId: string;
    isEdit: boolean
    initialBizNumber?: string;
    initialBizImg?: string
    registrationTableId?: string
}

export interface BusinessBizImgProps {
    preview: string;
    removeFile: () => void;
    onOpenModal: () => void
}