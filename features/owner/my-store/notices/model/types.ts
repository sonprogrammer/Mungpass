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

