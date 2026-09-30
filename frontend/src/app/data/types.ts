export type Lang = 'mr' | 'en';

export interface Text {
  mr: string;
  en: string;
}

export interface NavItem {
  path: string;
  label: Text;
  exact?: boolean;
}

export interface ManifestoPoint {
  id: string;
  title: Text;
  lead?: Text;
  items: Text[];
}

export interface DistrictNote {
  id: string;
  name: Text;
  note: Text;
}

export interface NewsItem {
  id: string;
  /** `story` (default) opens a detail page, `link` opens an outside page, `video` plays YouTube. */
  kind?: 'story' | 'link' | 'video';
  link?: string | null;
  source?: string | null;
  banner: string;
  title: Text;
  description: Text;
  images: string[];
  /** `YYYY-MM-DD`. Newest dates are shown first. */
  date: string;
}

export interface NewsPage {
  items: NewsItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface Album {
  id: string;
  title: Text;
  summary: Text;
  cover: string;
  images: string[];
}

export interface Stat {
  value: string;
  label: Text;
}

export interface Award {
  year: string;
  title: Text;
}
