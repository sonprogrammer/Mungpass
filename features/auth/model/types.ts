export interface AuthTabProps{
    isLogin: boolean
    setIsLogin: (value: boolean) => void
}


export interface SignupFieldsProps{
    email: string;
    setEmail: (val: string) => void;
    emailStatus: 'idle' | 'checking' | 'available' | 'taken',
    setEmailStatus: (status: 'idle' | 'checking' | 'available' | 'taken') => void;
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