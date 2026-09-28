import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LanguageService } from '../../core/language.service';
import { ToastService } from '../../core/toast.service';
import { profile, voterDistricts } from '../../data/site';

interface VoterHit {
  name: string;
  relativeName: string;
  district: string;
  part: string;
  serial: string;
  institute: string;
  address: string;
}

@Component({
  selector: 'app-voters',
  templateUrl: './voters.html',
})
export class Voters {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  readonly lang = inject(LanguageService);
  readonly profile = profile;
  readonly districts = voterDistricts;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cardEl = viewChild<ElementRef<HTMLElement>>('cardEl');

  readonly district = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('district') ?? 'all')),
    { initialValue: 'all' },
  );
  readonly query = signal('');
  readonly searched = signal(false);
  readonly loading = signal(false);
  readonly failed = signal(false);
  readonly matches = signal<VoterHit[]>([]);
  readonly total = signal(0);
  readonly expandedKey = signal<string | null>(null);
  readonly generating = signal<'download' | 'share' | null>(null);

  districtName(id: string): string {
    const found = this.districts.find((item) => item.id === id);
    return found ? this.lang.t(found.name) : id;
  }

  setDistrict(id: string): void {
    void this.router.navigate([], { queryParams: { district: id === 'all' ? null : id }, queryParamsHandling: 'merge' });
    this.searched.set(false);
    this.matches.set([]);
    this.expandedKey.set(null);
  }

  search(event: Event): void {
    event.preventDefault();
    const name = this.query().trim();
    this.searched.set(true);
    this.failed.set(false);
    this.expandedKey.set(null);
    if (name.length < 2) {
      this.matches.set([]);
      this.total.set(0);
      return;
    }
    this.loading.set(true);
    const district = this.district();
    this.http.get<{ items: VoterHit[]; total: number }>('/api/voters', {
      params: { name, district: district === 'all' ? '' : district },
    }).subscribe({
      next: (result) => {
        this.loading.set(false);
        this.matches.set(result.items);
        this.total.set(result.total);
      },
      error: () => {
        this.loading.set(false);
        this.failed.set(true);
        this.matches.set([]);
      },
    });
  }

  rowKey(row: VoterHit): string {
    return `${row.district}|${row.part}|${row.serial}|${row.name}`;
  }

  isExpanded(row: VoterHit): boolean {
    return this.expandedKey() === this.rowKey(row);
  }

  toggle(row: VoterHit): void {
    const key = this.rowKey(row);
    this.expandedKey.set(this.expandedKey() === key ? null : key);
  }

  private async renderCard(): Promise<HTMLCanvasElement | null> {
    const element = this.cardEl()?.nativeElement;
    if (!element) {
      return null;
    }
    const html2canvas = (await import('html2canvas')).default;
    return html2canvas(element, { backgroundColor: null, scale: 2, useCORS: true });
  }

  async downloadCard(voter: VoterHit): Promise<void> {
    if (this.generating()) {
      return;
    }
    this.generating.set('download');
    try {
      const canvas = await this.renderCard();
      if (!canvas) {
        return;
      }
      const link = document.createElement('a');
      link.download = `${voter.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      this.toast.error(this.lang.lang() === 'mr' ? 'कार्ड जतन होऊ शकले नाही.' : 'Could not save the card.');
    } finally {
      this.generating.set(null);
    }
  }

  async shareCard(voter: VoterHit): Promise<void> {
    if (this.generating()) {
      return;
    }
    this.generating.set('share');
    try {
      const canvas = await this.renderCard();
      if (!canvas) {
        return;
      }
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const shareText = this.lang.lang() === 'mr'
        ? `${voter.name} — शिक्षक मतदार ओळखपत्र`
        : `${voter.name} — Teacher voter card`;
      const file = blob ? new File([blob], 'voter-card.png', { type: 'image/png' }) : null;
      const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };
      if (file && nav.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText });
        return;
      }
      if (navigator.share) {
        await navigator.share({ text: shareText });
        return;
      }
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener');
    } catch (err) {
      if ((err as DOMException)?.name !== 'AbortError') {
        this.toast.error(this.lang.lang() === 'mr' ? 'कार्ड शेअर होऊ शकले नाही.' : 'Could not share the card.');
      }
    } finally {
      this.generating.set(null);
    }
  }
}
