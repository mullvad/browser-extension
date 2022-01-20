export interface Extension {
  id: string;
  name: string;
  author: string;
  description: string;
  homeUrl: string;
  addonUrl: string;
  icon: string;
  installed: boolean;
  enabled: boolean;
  ignored: boolean;
}

export type ExtensionInfo = browser.management.ExtensionInfo | Extension;
