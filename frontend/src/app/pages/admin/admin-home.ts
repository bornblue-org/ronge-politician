import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

interface Summary {
  problems: number;
  news: number;
  voters: number;
}

interface ModuleRow {
  key: keyof Summary;
  label: string;
  unit: string;
  status: string;
  icon: string;
  accent: 'info' | 'warning' | 'success';
  link: string;
  linkLabel: string;
}

const MODULES: ModuleRow[] = [
  {
    key: 'problems',
    label: 'Teacher problems',
    unit: 'submissions',
    status: 'Needs review',
    icon: 'fa-solid fa-triangle-exclamation',
    accent: 'warning',
    link: '/admin/problems',
    linkLabel: 'Review problems',
  },
  {
    key: 'news',
    label: 'News stories',
    unit: 'published',
    status: 'Live on site',
    icon: 'fa-solid fa-newspaper',
    accent: 'success',
    link: '/admin/news',
    linkLabel: 'Manage news',
  },
  {
    key: 'voters',
    label: 'Election list',
    unit: 'voters on file',
    status: 'Up to date',
    icon: 'fa-solid fa-people-group',
    accent: 'info',
    link: '/admin/voters',
    linkLabel: 'Open election list',
  },
];

const QUICK_ACTIONS = [
  { icon: 'fa-solid fa-plus', label: 'Add a news story', hint: 'Publish a new update with photos', link: '/admin/news' },
  { icon: 'fa-solid fa-file-arrow-up', label: 'Upload election roll', hint: 'Add voters from a PART PDF', link: '/admin/voters' },
  { icon: 'fa-solid fa-list-check', label: 'Review problems', hint: 'Check new teacher submissions', link: '/admin/problems' },
];

function ordinal(day: number): string {
  if (day % 10 === 1 && day !== 11) return 'st';
  if (day % 10 === 2 && day !== 12) return 'nd';
  if (day % 10 === 3 && day !== 13) return 'rd';
  return 'th';
}

@Component({
  selector: 'app-admin-home',
  imports: [RouterLink],
  templateUrl: './admin-home.html',
})
export class AdminHome {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly summary = signal<Summary>({ problems: 0, news: 0, voters: 0 });

  readonly quickActions = QUICK_ACTIONS;
  readonly modules = computed(() => MODULES.map((row) => ({ ...row, value: this.summary()[row.key] })));

  readonly today = (() => {
    const now = new Date();
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    return `${weekday}, ${now.getDate()}${ordinal(now.getDate())} ${month}`;
  })();

  readonly greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  constructor() {
    this.http.get<Summary>('/api/admin/summary').subscribe({
      next: (summary) => this.summary.set(summary),
      error: () => this.auth.logout(),
    });
  }
}
