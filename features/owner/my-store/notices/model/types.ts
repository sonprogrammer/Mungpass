export interface PostData {
    title: string;
    content: string;
    is_show: boolean
}

export interface PostNotice{
    shopId: string;
    noticeId?: string;
    postData: PostData
}

export interface NoticeFromDb{
    created_at: string;
    content: string;
    shop_id: string;
    updated_at: string
    title: string;
    is_show?: boolean;
    id: string;
}

export interface NoticeType {
  id: string
  title: string;
  content: string;
  updated_at: string;
  is_show?: boolean
}

export interface StoreNoticeModalProps{
    shopId: string;
    isOpen: boolean;
    onClose: () => void;
    selectedNotice: NoticeType | null
}

export interface StoreNoticeDeleteCheckModalProps{
    shopId: string;
    noticeId: string | null;
    isOpen: boolean
    onClose: () => void
}