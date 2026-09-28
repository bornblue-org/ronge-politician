import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { NewsService } from '../../core/news.service';
import { LanguageService } from '../../core/language.service';
import { NewsItem, Text } from '../../data/types';

@Component({
  selector: 'app-news-detail',
  imports: [RouterLink],
  templateUrl: './news-detail.html',
})
export class NewsDetail {
  readonly lang = inject(LanguageService);
  readonly id = input('');
  private readonly newsApi = inject(NewsService);
  readonly state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        this.newsApi.get(id).pipe(
          map((item) => ({ ready: true, item })),
          startWith({ ready: false, item: undefined as NewsItem | undefined }),
        ),
      ),
    ),
    { initialValue: { ready: false, item: undefined as NewsItem | undefined } },
  );

  paragraphs(description: Text): string[] {
    return this.lang.t(description).split(/\n\n+/).filter((part) => part.trim().length > 0);
  }
}
