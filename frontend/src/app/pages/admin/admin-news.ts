import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/toast.service';
import { NewsItem, NewsPage } from '../../data/types';

@Component({
  selector: 'app-admin-news',
  imports: [DatePipe, FormsModule],
  templateUrl: './admin-news.html',
})
export class AdminNews {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  readonly result = signal<NewsPage>({ items: [], page: 1, pageSize: 100, total: 0 });

  readonly formOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly images = signal<string[]>([]);
  readonly saving = signal(false);
  titleMr = '';
  titleEn = '';
  descriptionMr = '';
  descriptionEn = '';
  date = '';

  constructor() {
    this.load();
  }

  load(): void {
    this.http.get<NewsPage>('/api/news', { params: { page: 1, pageSize: 100 } }).subscribe((result) => this.result.set(result));
  }

  remove(id: string): void {
    this.http.delete(`/api/admin/news/${id}`).subscribe({
      next: () => {
        this.toast.success('Story deleted.');
        this.load();
      },
      error: () => this.toast.error('Could not delete the story.'),
    });
  }

  openAdd(): void {
    this.editingId.set(null);
    this.titleMr = '';
    this.titleEn = '';
    this.descriptionMr = '';
    this.descriptionEn = '';
    this.date = '';
    this.images.set([]);
    this.formOpen.set(true);
  }

  openEdit(item: NewsItem): void {
    this.editingId.set(item.id);
    this.titleMr = item.title.mr;
    this.titleEn = item.title.en;
    this.descriptionMr = item.description.mr;
    this.descriptionEn = item.description.en;
    this.date = item.date;
    this.images.set(item.images);
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
  }

  saveStory(event: Event, bannerInput: HTMLInputElement, imagesInput: HTMLInputElement): void {
    event.preventDefault();
    const data = new FormData();
    data.set('titleMr', this.titleMr);
    data.set('titleEn', this.titleEn);
    data.set('descriptionMr', this.descriptionMr);
    data.set('descriptionEn', this.descriptionEn);
    data.set('date', this.date);
    const banner = bannerInput.files?.[0];
    if (banner) {
      data.set('banner', banner);
    }
    for (const file of Array.from(imagesInput.files ?? [])) {
      data.append('images', file);
    }
    this.saving.set(true);
    const id = this.editingId();
    const request = id
      ? this.http.put<NewsItem>(`/api/admin/news/${id}`, data)
      : this.http.post<NewsItem>('/api/admin/news', data);
    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.formOpen.set(false);
        this.toast.success(id ? 'Story updated.' : 'Story added.');
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error(err?.error?.message ?? 'Could not save the story.');
      },
    });
  }

  removeImage(path: string): void {
    const id = this.editingId();
    const filename = path.split('/').pop();
    if (!id || !filename) {
      return;
    }
    this.http.delete<NewsItem>(`/api/admin/news/${id}/images/${filename}`).subscribe((story) => this.images.set(story.images));
  }
}
