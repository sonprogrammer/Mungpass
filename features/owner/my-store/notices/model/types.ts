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