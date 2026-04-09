import { Activity, Home, Lock, Settings, Wallet } from 'lucide-react-native';

export const tabs: AppTab[] = [
  { name: 'home', title: 'Home', icon: Home },
  { name: 'index', title: 'Home', icon: Home },
  { name: 'subscriptions', title: 'Subscriptions', icon: Wallet },
  { name: 'insights', title: 'Insights', icon: Activity },
  { name: 'settings', title: 'Settings', icon: Settings },
  { name: 'auth1', title: 'Auth', icon: Lock },
];
