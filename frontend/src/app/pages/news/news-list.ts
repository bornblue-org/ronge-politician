import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { NewsService } from '../../core/news.service';
import { LanguageService } from '../../core/language.service';
import { NewsPage } from '../../data/types';

@Component({
  selector: 'app-news-list',
  imports: [RouterLink],
  templateUrl: './news-list.html',
})
export class NewsList {
  readonly lang = inject(LanguageService);
  private readonly newsApi = inject(NewsService);
  readonly page = signal(1);
  readonly result = toSignal(
    toObservable(this.page).pipe(switchMap((page) => this.newsApi.page(page))),
    { initialValue: { items: [], page: 1, pageSize: 9, total: 0 } as NewsPage },
  );
  readonly pageCount = computed(() => Math.max(1, Math.ceil(this.result().total / this.result().pageSize)));
  readonly pages = computed(() => Array.from({ length: this.pageCount() }, (_, index) => index + 1));

  open(page: number): void {
    if (page < 1 || page > this.pageCount() || page === this.page()) {
      return;
    }
    this.page.set(page);
    window.scrollTo({ top: 0 });
  }
}
