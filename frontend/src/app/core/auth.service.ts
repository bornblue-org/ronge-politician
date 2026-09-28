import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const TOKEN_KEY = 'ronge-admin-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  readonly token = signal(sessionStorage.getItem(TOKEN_KEY));

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/admin/login', { username, password }).pipe(
      tap((response) => {
        sessionStorage.setItem(TOKEN_KEY, response.token);
        this.token.set(response.token);
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
    void this.router.navigate(['/admin/login']);
  }
}
