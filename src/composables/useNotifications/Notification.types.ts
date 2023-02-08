export interface Notification {
  id: string;
  name: string;
  description: string;
  ctaUrl?: string;
  icon?: 'warning' | 'success' | 'info' | 'leak';
}
