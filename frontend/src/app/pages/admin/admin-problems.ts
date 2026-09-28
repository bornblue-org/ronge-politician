import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

interface ProblemRow {
  id: number;
  name: string;
  phone: string;
  district: string;
  school: string;
  topic: string;
  detail: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin-problems',
  imports: [DatePipe],
  templateUrl: './admin-problems.html',
})
export class AdminProblems {
  private readonly http = inject(HttpClient);
  readonly rows = signal<ProblemRow[]>([]);
  readonly loaded = signal(false);
  readonly openId = signal<number | null>(null);

  constructor() {
    this.http.get<ProblemRow[]>('/api/admin/problems').subscribe((rows) => {
      this.rows.set(rows);
      this.loaded.set(true);
    });
  }

  toggle(id: number): void {
    this.openId.set(this.openId() === id ? null : id);
  }
}
