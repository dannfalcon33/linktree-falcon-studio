import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  featured?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}