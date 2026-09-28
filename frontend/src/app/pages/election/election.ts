import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { districts, manifestoIntro, manifestoPoints } from '../../data/manifesto';

@Component({
  selector: 'app-election',
  templateUrl: './election.html',
})
export class Election {
  readonly lang = inject(LanguageService);
  readonly intro = manifestoIntro;
  readonly points = manifestoPoints;
  readonly districts = districts;
  readonly openId = signal<string | null>(null);

  constructor() {
    const fragment = inject(ActivatedRoute).snapshot.fragment;
    if (fragment && manifestoPoints.some((point) => point.id === fragment)) {
      this.openId.set(fragment);
    }
  }

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}
