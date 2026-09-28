import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { profile } from '../../data/site';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-shell.html',
})
export class AdminShell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly profile = profile;
  readonly sidebarOpen = signal(false);
  readonly userMenuOpen = signal(false);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly pageTitle = computed(() => {
    const url = this.url().split('?')[0];
    if (url.startsWith('/admin/problems')) return 'Teacher problems';
    if (url.startsWith('/admin/news')) return 'News';
    if (url.startsWith('/admin/voters')) return 'Election list';
    return 'Dashboard';
  });

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.userMenuOpen.update((open) => !open);
  }

  @HostListener('document:click')
  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
  }
}
