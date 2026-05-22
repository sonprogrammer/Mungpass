export type UsageLogStatus = 'staying' | 'completed' | 'cancelled'

export interface UsageLogBase {
  id: string
  shop_id: string
  user_id: string
  dog_id: string
  product_id: string
  status: UsageLogStatus
  started_at: string
  ended_at: string | null
  created_at: string
}

export interface DogInfo {
  name: string
  image_url: string | null
  breed: string | null
  weight: number | null
  birth_date: string | null
  description: string | null
}

export interface OwnerInfo {
  name: string
  phone_number: string | null
}

export interface ProductInfo {
  name: string
  duration_minutes: number
  price: number
  category: {
    name: string;
    id: string;
  }
}

export interface CurrentUsageLog extends UsageLogBase  {
  dog: DogInfo | null
  owner: OwnerInfo | null
  product: ProductInfo | null
}


export interface OvertimePolicy {
    unitMins: number;  
    unitPrice: number; 
}
export interface useTimerProps{
    startedAt: string;
    expectedEndAt: string;
    endedAt?: string | null;
    gracePeriodMins?: number;
    overtimePolicy?: OvertimePolicy;
}