import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../core/toast.service';

const BULK_CHUNK_SIZE = 20;

interface AdminVoter {
  id: number;
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

interface BulkFileSummary {
  filename: string;
  totalRows: number;
  duplicateCount: number;
  newCount: number;
  error: string | null;
}

interface BulkPreview {
  batchId: string;
  files: BulkFileSummary[];
}

interface BulkSaveResult {
  saved: number;
  skipped: number;
  failedFiles: string[];
}

interface BulkFileRow extends BulkFileSummary {
  batchId: string;
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

  readonly bulkOpen = signal(false);
  readonly bulkFiles = signal<File[]>([]);
  readonly bulkDragActive = signal(false);
  readonly bulkUploading = signal(false);
  readonly bulkProgress = signal<{ done: number; total: number }>({ done: 0, total: 0 });
  readonly bulkFileRows = signal<BulkFileRow[] | null>(null);
  readonly bulkExcluded = signal<Set<string>>(new Set());
  readonly bulkSaving = signal(false);

  readonly deletingId = signal<number | null>(null);
  readonly deleteAllOpen = signal(false);
  readonly deleteAllConfirmText = signal('');
  readonly deletingAll = signal(false);

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

  openBulkUpload(): void {
    this.bulkFiles.set([]);
    this.bulkOpen.set(true);
  }

  closeBulkUpload(): void {
    this.bulkOpen.set(false);
    this.bulkFiles.set([]);
    this.bulkDragActive.set(false);
  }

  onBulkFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addBulkFiles(input.files);
    input.value = '';
  }

  onBulkDragOver(event: DragEvent): void {
    event.preventDefault();
    this.bulkDragActive.set(true);
  }

  onBulkDragLeave(): void {
    this.bulkDragActive.set(false);
  }

  onBulkDrop(event: DragEvent): void {
    event.preventDefault();
    this.bulkDragActive.set(false);
    this.addBulkFiles(event.dataTransfer?.files);
  }

  private addBulkFiles(list: FileList | null | undefined): void {
    if (!list || list.length === 0) {
      return;
    }
    const incoming = Array.from(list);
    const rejected = incoming.filter((file) => file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'));
    const accepted = incoming.filter((file) => !rejected.includes(file));
    if (rejected.length > 0) {
      this.toast.error(`Skipped ${rejected.length} non-PDF file(s).`);
    }
    this.bulkFiles.update((current) => [...current, ...accepted]);
  }

  removeBulkFile(index: number): void {
    this.bulkFiles.update((files) => files.filter((_, i) => i !== index));
  }

  async submitBulkUpload(): Promise<void> {
    const files = this.bulkFiles();
    if (files.length === 0) {
      return;
    }
    const chunks: File[][] = [];
    for (let start = 0; start < files.length; start += BULK_CHUNK_SIZE) {
      chunks.push(files.slice(start, start + BULK_CHUNK_SIZE));
    }

    this.bulkUploading.set(true);
    this.bulkProgress.set({ done: 0, total: files.length });
    this.closeBulkUpload();

    const rows: BulkFileRow[] = [];
    const autoExcluded = new Set<string>();
    let filesDone = 0;

    for (const chunk of chunks) {
      const data = new FormData();
      for (const file of chunk) {
        data.append('files', file);
      }
      let result: BulkPreview | null = null;
      let lastError: any = null;
      for (let attempt = 0; attempt < 3 && !result; attempt++) {
        if (attempt > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        try {
          result = await firstValueFrom(this.http.post<BulkPreview>('/api/admin/voters/bulk-preview', data));
        } catch (err) {
          lastError = err;
        }
      }
      if (result) {
        for (const file of result.files) {
          const key = `${result.batchId}::${file.filename}`;
          rows.push({ ...file, batchId: result.batchId });
          if (file.error) {
            autoExcluded.add(key);
          }
        }
      } else {
        const message = lastError?.error?.message ?? 'Upload failed after 3 attempts (network or server error). Re-select and upload this file again separately.';
        for (const file of chunk) {
          rows.push({ filename: file.name, totalRows: 0, duplicateCount: 0, newCount: 0, error: message, batchId: '' });
          autoExcluded.add(`::${file.name}`);
        }
        this.toast.error(`${chunk.length} file(s) failed to upload after retries.`);
      }
      filesDone += chunk.length;
      this.bulkProgress.set({ done: Math.min(filesDone, files.length), total: files.length });
    }

    this.bulkUploading.set(false);
    this.bulkExcluded.set(autoExcluded);
    this.bulkFileRows.set(rows);
  }

  private bulkKey(row: BulkFileRow): string {
    return `${row.batchId}::${row.filename}`;
  }

  toggleBulkFile(row: BulkFileRow): void {
    const key = this.bulkKey(row);
    this.bulkExcluded.update((excluded) => {
      const next = new Set(excluded);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  isBulkFileIncluded(row: BulkFileRow): boolean {
    return !this.bulkExcluded().has(this.bulkKey(row));
  }

  bulkTotals(): { new: number; duplicate: number; included: number } {
    const rows = this.bulkFileRows();
    if (!rows) {
      return { new: 0, duplicate: 0, included: 0 };
    }
    const excluded = this.bulkExcluded();
    let included = 0;
    let newCount = 0;
    let duplicateCount = 0;
    for (const row of rows) {
      if (row.error || excluded.has(this.bulkKey(row))) {
        continue;
      }
      included++;
      newCount += row.newCount;
      duplicateCount += row.duplicateCount;
    }
    return { new: newCount, duplicate: duplicateCount, included };
  }

  closeBulkPreview(): void {
    this.bulkFileRows.set(null);
    this.bulkExcluded.set(new Set());
  }

  saveBulk(): void {
    const rows = this.bulkFileRows();
    if (!rows) {
      return;
    }
    const excluded = this.bulkExcluded();
    const byBatch = new Map<string, string[]>();
    for (const row of rows) {
      if (!row.batchId) {
        continue;
      }
      if (!byBatch.has(row.batchId)) {
        byBatch.set(row.batchId, []);
      }
      if (excluded.has(this.bulkKey(row))) {
        byBatch.get(row.batchId)!.push(row.filename);
      }
    }
    const batches = Array.from(byBatch.entries()).map(([batchId, excludedFiles]) => ({ batchId, excludedFiles }));

    this.bulkSaving.set(true);
    this.http.post<BulkSaveResult>('/api/admin/voters/bulk-save', { batches }).subscribe({
      next: (result) => {
        this.bulkSaving.set(false);
        this.closeBulkPreview();
        const failedNote = result.failedFiles.length > 0 ? ` ${result.failedFiles.length} file(s) failed to parse.` : '';
        this.toast.success(`Saved ${result.saved} voters. Skipped ${result.skipped} duplicates.${failedNote}`);
        this.load(1);
      },
      error: (err) => {
        this.bulkSaving.set(false);
        this.toast.error(err?.error?.message ?? 'Could not save this batch.');
      },
    });
  }

  deleteVoter(voter: AdminVoter): void {
    if (!confirm(`Delete ${voter.name} (${voter.district} · part ${voter.part} · serial ${voter.serial})?`)) {
      return;
    }
    this.deletingId.set(voter.id);
    this.http.delete<void>(`/api/admin/voters/${voter.id}`).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.toast.success('Voter deleted.');
        this.load(this.result().page);
      },
      error: (err) => {
        this.deletingId.set(null);
        this.toast.error(err?.error?.message ?? 'Could not delete this voter.');
      },
    });
  }

  openDeleteAll(): void {
    this.deleteAllConfirmText.set('');
    this.deleteAllOpen.set(true);
  }

  closeDeleteAll(): void {
    this.deleteAllOpen.set(false);
    this.deleteAllConfirmText.set('');
  }

  confirmDeleteAll(): void {
    if (this.deleteAllConfirmText().trim().toUpperCase() !== 'DELETE') {
      return;
    }
    this.deletingAll.set(true);
    this.http.delete<void>('/api/admin/voters').subscribe({
      next: () => {
        this.deletingAll.set(false);
        this.closeDeleteAll();
        this.toast.success('All voters deleted.');
        this.load(1);
      },
      error: (err) => {
        this.deletingAll.set(false);
        this.toast.error(err?.error?.message ?? 'Could not delete all voters.');
      },
    });
  }
}
