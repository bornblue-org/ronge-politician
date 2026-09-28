import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { LanguageService } from '../core/language.service';
import { nav, profile } from '../data/site';
import { Text } from '../data/types';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.html',
})
export class Shell implements OnInit {
  readonly lang = inject(LanguageService);
  readonly profile = profile;
  readonly nav = nav;
  readonly menuOpen = signal(false);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private pageTitle: Text = { mr: 'मुख्य पान', en: 'Home' };

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen.set(false);
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const dataTitle = route.snapshot.data['title'] as Text | undefined;
      if (dataTitle) {
        this.pageTitle = dataTitle;
        this.applyTitle();
      }
    });
  }

  ngOnInit(): void {
    this.applyTitle();
  }

  setLang(code: 'mr' | 'en'): void {
    this.lang.set(code);
    this.applyTitle();
  }

  private applyTitle(): void {
    const name = this.lang.t(profile.shortName);
    this.title.setTitle(`${this.lang.t(this.pageTitle)} | ${name}`);
  }
}
