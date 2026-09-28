import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/toast.service';

interface AdminVoter {
  name: string;
  relativeName: string;
  district: string;
  part: string;
  serial: string;
  institute: string;
  age: number | null;
  gender: string;
  epicNo: string;
}

interface VoterPage {
  items: AdminVoter[];
  page: number;
  pageSize: number;
  total: number;
}

interface PreviewRow {
  key: number;
  duplicate: boolean;
  name: string;
  relativeName: string;
  address: string;
  institute: string;
  age: number | null;
  gender: string;
  epicNo: string;
  district: string;
  part: string;
  serial: number;
}

interface Preview {
  rows: PreviewRow[];
  duplicateCount: number;
  newCount: number;
}

@Component({
  selector: 'app-admin-voters',
  imports: [FormsModule],
  templateUrl: './admin-voters.html',
})
export class AdminVoters {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  readonly result = signal<VoterPage>({ items: [], page: 1, pageSize: 25, total: 0 });
  readonly uploading = signal(false);
  readonly saving = signal(false);
  readonly preview = signal<PreviewRow[] | null>(null);
  readonly uploadOpen = signal(false);
  readonly selectedFile = signal<File | null>(null);
  readonly dragActive = signal(false);
  name = '';
  district = '';
  part = '';

  constructor() {
    this.load(1);
  }

  get rangeStart(): number {
    const { total, page, pageSize } = this.result();
    return total === 0 ? 0 : (page - 1) * pageSize + 1;
  }

  get rangeEnd(): number {
    const { total, page, pageSize } = this.result();
    return Math.min(total, page * pageSize);
  }

  get selectedFileSize(): string {
    const bytes = this.selectedFile()?.size ?? 0;
    return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  duplicateCount(): number {
    return this.preview()?.filter((row) => row.duplicate).length ?? 0;
  }

  load(page: number): void {
    this.http.get<VoterPage>('/api/admin/voters', {
      params: {
        page,
        pageSize: 25,
        name: this.name.trim(),
        district: this.district.trim(),
        part: this.part.trim(),
      },
    }).subscribe((result) => this.result.set(result));
  }

  openUpload(): void {
    this.selectedFile.set(null);
    this.uploadOpen.set(true);
  }

  closeUpload(): void {
    this.uploadOpen.set(false);
    this.selectedFile.set(null);
    this.dragActive.set(false);
  }

  onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.pickFile(input.files?.[0]);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragActive.set(true);
  }

  onDragLeave(): void {
    this.dragActive.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragActive.set(false);
    this.pickFile(event.dataTransfer?.files?.[0]);
  }

  private pickFile(file: File | undefined): void {
    if (!file) {
      return;
    }
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.toast.error('Please choose a PDF file.');
      return;
    }
    this.selectedFile.set(file);
  }

  clearSelectedFile(): void {
    this.selectedFile.set(null);
  }

  submitUpload(): void {
    const file = this.selectedFile();
    if (!file) {
      return;
    }
    const data = new FormData();
    data.set('file', file);
    this.uploading.set(true);
    this.http.post<Preview>('/api/admin/voters/preview', data).subscribe({
      next: (result) => {
        this.uploading.set(false);
        this.preview.set(result.rows);
        this.closeUpload();
      },
      error: (err) => {
        this.uploading.set(false);
        this.toast.error(err?.error?.message ?? 'Could not read that PDF.');
      },
    });
  }

  remove(key: number): void {
    this.preview.update((rows) => rows?.filter((row) => row.key !== key) ?? null);
  }

  removeDuplicates(): void {
    this.preview.update((rows) => rows?.filter((row) => !row.duplicate) ?? null);
  }

  closePreview(): void {
    this.preview.set(null);
  }

  save(): void {
    const rows = this.preview();
    if (!rows?.length) {
      return;
    }
    this.saving.set(true);
    this.http.post<{ saved: number; skipped: number }>('/api/admin/voters', rows).subscribe({
      next: (result) => {
        this.saving.set(false);
        this.preview.set(null);
        this.toast.success(`Saved ${result.saved}. Skipped ${result.skipped} exact copies.`);
        this.load(1);
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error(err?.error?.message ?? 'Could not save these rows.');
      },
    });
  }
}
