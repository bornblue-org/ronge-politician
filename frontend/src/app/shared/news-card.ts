import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../core/language.service';
import { NewsItem } from '../data/types';

@Component({
  selector: 'app-news-card',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './news-card.html',
})
export class NewsCard {
  readonly lang = inject(LanguageService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly item = input.required<NewsItem>();
  readonly playing = signal(false);

  readonly kind = computed(() => this.item().kind ?? 'story');
  readonly sourceIcon = computed(() => {
    switch (this.item().source) {
      case 'YouTube': return 'fa-brands fa-youtube';
      case 'Facebook': return 'fa-brands fa-facebook';
      case 'Instagram': return 'fa-brands fa-instagram';
      default: return 'fa-solid fa-newspaper';
    }
  });
  readonly sourceClass = computed(() => (this.item().source ?? 'news').toLowerCase().replace(/[^a-z]/g, '') || 'news');
  readonly embedUrl = computed(() => {
    const id = this.youtubeId(this.item().link ?? '');
    return id ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`) : null;
  });

  private youtubeId(link: string): string | null {
    try {
      const url = new URL(link);
      let id: string | null = null;
      if (url.hostname === 'youtu.be') {
        id = url.pathname.slice(1);
      } else if (url.hostname.endsWith('youtube.com')) {
        id = url.searchParams.get('v') ?? url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] ?? null;
      }
      return id && /^[A-Za-z0-9_-]{6,20}$/.test(id) ? id : null;
    } catch {
      return null;
    }
  }
}
