import { CurrentLog } from './../../../entities/owner/model/types';
export interface CurrentUser {
    id: number;
    petName: string;
    petImage?: string;
    breed: string;
    startTime: string;
    duration: string;
    type: string;
}

export interface TodayDone{
  id: number;
  petName: string;
  type: string;
  totalTime: string;
  price: string; //이건 store_products 테이블에 있는거에서 price가져오면됨 -> 이게 꼭 없어도 되고
}

export interface NavItemProps{
  href: string;
  label: string;
  icon: React.ComponentType<{className? : string}>;
  active: boolean
}

export interface CurrentLogListProps{
  data: CurrentLog[]
  onCheckout?: (item: CurrentLog) => void
}