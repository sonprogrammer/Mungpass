import { Dog } from '@/entities/dog/model';
import { UserProfile } from '@/entities/user/model';

export interface GreetMessageProps{
    userData: UserProfile |null;
    myDog: Dog[] | undefined
}

export interface MyDogWidgetProps{
    dogPostModal: ()=> void; 
    dogViewModal: () => void;
}