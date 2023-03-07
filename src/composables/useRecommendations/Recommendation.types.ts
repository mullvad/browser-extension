export interface Recommendation {
  type: 'extension' | 'setting' | 'warning';
  id: string;
  name: string;
  description: string;
  icon?: string;
  iconType?: 'warning' | 'success' | 'info' | 'leak';
  homeUrl?: string;
  warning?: string;
  ctaLabel: 'install' | 'enable' | 'disable' | undefined;
  ctaUrl?: string;
  installed?: boolean;
  enabled?: boolean;
  activated: boolean;
  ignored: boolean;
}
