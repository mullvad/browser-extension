export interface Recommendation {
  type: 'extension' | 'setting';
  id: string;
  name: string;
  description: string;
  icon?: string;
  homeUrl?: string;
  warning?: string;
  ctaLabel: 'install' | 'enable' | 'disable' | undefined;
  ctaUrl?: string;
  installed?: boolean;
  enabled?: boolean;
  activated: boolean;
  ignored: boolean;
}
