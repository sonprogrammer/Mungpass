import { CurrentUsageLog } from "@/entities/check-in/model/types";

export const mockCurrentUsageLog: CurrentUsageLog[] = [{
    id: "log-1",
    shop_id: "shop-123",
    user_id: "user-456",
    dog_id: "dog-789",
    product_id: "product-001",
    status: "staying",
    started_at: "2026-03-20T10:30:00Z",
    ended_at: null,
    created_at: "2026-03-20T10:25:00Z",
  
    dog: {
      name: "초코",
      image_url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=200",
      breed: "푸들",
      weight: 4.2,
      birth_date: "2022-05-10",
      description: "사람 좋아하고 활발함",
    },
  
    owner: {
      name: "김영진",
      phone_number: "010-1234-5678",
    },
    
    product: {
        name: "유치원 3시간권",
        duration_minutes: 180,
        price: 30000
    },
  },
    {
    id: "log-12",
    shop_id: "shop-1232",
    user_id: "user-4562",
    dog_id: "dog-7892",
    product_id: "product-0012",
    status: "completed",
    started_at: "2026-03-20T10:30:00Z",
    ended_at: "2026-03-20T13:30:00Z",
    created_at: "2026-03-20T10:25:00Z",
  
    dog: {
      name: "초코",
      image_url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=200",
      breed: "푸들",
      weight: 4.2,
      birth_date: "2022-05-10",
      description: "사람 좋아하고 활발함",
    },
  
    owner: {
      name: "김영진",
      phone_number: "010-1234-5678",
    },
    
    product: {
        name: "유치원 3시간권",
        duration_minutes: 180,
        price: 30000
    },
  },
    {
    id: "log-123",
    shop_id: "shop-12323",
    user_id: "user-45623",
    dog_id: "dog-78923",
    product_id: "product-00123",
    status: "cancelled",
    started_at: "2026-03-20T10:30:00Z",
    ended_at: null,
    created_at: "2026-03-20T10:25:00Z",
  
    dog: {
      name: "초코",
      image_url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=200",
      breed: "푸들",
      weight: 4.2,
      birth_date: "2022-05-10",
      description: "사람 좋아하고 활발함",
    },
  
    owner: {
      name: "김영진",
      phone_number: "010-1234-5678",
    },
    
    product: {
        name: "유치원 3시간권",
        duration_minutes: 180,
        price: 30000
    },
  },
];
  