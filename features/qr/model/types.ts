import { UsageLogStatus } from "@/entities/check-in/model/types";
import { Dog } from "@/entities/dog/model/types";
import { Product, ProductWithCategory } from "@/features/owner/my-store/product/model/types";

export interface QrModalProps {
    products: ProductWithCategory[]
    isPending: boolean
    open: boolean;
    qrValue: string;
    selectedProductId: string | null;
    onClose: () => void;
    onSelectProduct: (product: string | null) => void
    isVerified: boolean
}

//* db에서 오는 데이터임
//*  강아지 입퇴실 정보(usage_logs테이블), 강아지 정보(dogs테이블), 이용한 상품정보(store_products테이블)
export interface MyPetUsageAllInfo{
    dog: Dog
    id: string
    user_id: string
    dog_id: string;
    product_id: string;
    shop_id: string;
    status: UsageLogStatus;
    started_at: string;
    ended_at: string |null //안끝났을 수도 있으니깐 Null
    expected_ended_at: string;
    created_at: string;
    product: Product
    shop: { name : string}
}