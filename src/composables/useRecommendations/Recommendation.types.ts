export type Recommendation = {
  image?: string;
  title: string;
  description: string;
  anchor: string;
  cta: string;
  ctaURL?: string;
  ignored: boolean;
};
