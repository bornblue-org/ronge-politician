import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { NewsItem, NewsPage } from '../data/types';

const PAGE_SIZE = 9;

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);

  page(page = 1, pageSize = PAGE_SIZE): Observable<NewsPage> {
    return this.http.get<NewsPage>('/api/news', { params: { page, pageSize } }).pipe(
      catchError(() => of({ items: [], page, pageSize, total: 0 })),
    );
  }

  get(id: string): Observable<NewsItem | undefined> {
    return this.http.get<NewsItem>(`/api/news/${id}`).pipe(catchError(() => of(undefined)));
  }
}
