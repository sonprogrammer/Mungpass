export interface ConfirmModalProps{
    open: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmDanger?: boolean;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface KakaoScriptProviderProps{
    children: React.ReactNode
    fallback?: React.ReactNode
}