import { ReactNode } from "react";

export interface MenuPageListCardProps {
    icon: ReactNode;
    title: string;
    description?: string;
    subText?: string;
    badgeText?: string;
    onClick?: () => void;
  }