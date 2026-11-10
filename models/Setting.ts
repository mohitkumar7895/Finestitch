export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value: string;
  updated_at?: string;
}

export type SettingsMap = Record<string, string>;

