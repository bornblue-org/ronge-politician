import { Injectable, signal } from '@angular/core';
import { Lang, Text } from '../data/types';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(this.read());

  constructor() {
    this.apply(this.lang());
  }

  t(text: Text): string {
    return text[this.lang()];
  }

  set(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem('ronge-lang', lang);
    this.apply(lang);
  }

  formatDate(iso: string): string {
    const parsed = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      return iso;
    }
    return new Intl.DateTimeFormat(this.lang() === 'mr' ? 'mr-IN' : 'en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(parsed);
  }

  private read(): Lang {
    try {
      return localStorage.getItem('ronge-lang') === 'en' ? 'en' : 'mr';
    } catch {
      return 'mr';
    }
  }

  private apply(lang: Lang): void {
    document.documentElement.lang = lang === 'en' ? 'en' : 'mr';
  }
}
