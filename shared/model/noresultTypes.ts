import { ReactNode } from "react";

export interface NoResultProps{
    title: string;
    description: string | ReactNode;
    icon?: ReactNode
}