export interface ProductCategory {
    id: string;
    store_id: string;
    name: string;
    created_at: string;
}

export interface ProductCategorySubmitData{
    store_id: string;
    name: string
}

// * 디비로부터 가져온 데이터
export interface Product{
    id: string;
    store_id: string;
    category_id: ProductCategory
    name: string;
    price: number;
    duration_minutes: number;
    is_active: boolean;
    overtime_unit_mins: number;
    overtime_unit_price: number;
    grace_period_mins: number;
    created_at: string;

}

//* 디비에 새로 저장할테이터
export interface ProductSubmitData{
    name: string
    price: number;
    category_id: string | null
    duration_minutes: number;
    overtime_unit_mins: number;
    overtime_unit_price: number;   
    grace_period_mins: number;
    is_active?: boolean //미리 상품을 만들어놓은걸 수도 있으니깐 나중에 상품등록을 위해 남겨논거
}

export interface ProductWithCategory extends Product{
    product_categories: {name: string} | null
}