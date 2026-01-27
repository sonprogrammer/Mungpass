import { Dog } from '@/entities/dog/model/types';
import { UserProfile } from '@/entities/user/model/useUserStore';

export interface GreetMessageProps{
    userData: UserProfile |null;
    myDog: Dog | null
}