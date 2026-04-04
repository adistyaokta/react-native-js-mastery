import { LucideProps } from 'lucide-react-native';
import { ComponentType } from 'react';

declare global {
  interface AppTab {
    name: string;
    title: string;
    icon: ComponentType<LucideProps>;
  }
  interface TabIconProps {
    focused: boolean;
    icon: ComponentType<LucideProps>;
  }

  interface Subscription {
    id: string;
    icon: ComponentType<LucideProps>;
    name: string;
    plan?: string;
    category?: string;
    paymentMethod?: string;
    status?: string;
    startDate?: string;
    price: number;
    currency?: string;
    billing: string;
    renewalDate?: string;
    color?: string;
  }
}

export {};
