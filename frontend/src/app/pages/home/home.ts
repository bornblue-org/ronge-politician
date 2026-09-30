import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../core/news.service';
import { NewsCard } from '../../shared/news-card';
import { LanguageService } from '../../core/language.service';
import { districts } from '../../data/manifesto';
import { albums, heroLead, profile, stats, voterDistricts } from '../../data/site';
import { manifestoPoints } from '../../data/manifesto';

@Component({
  selector: 'app-home',
  imports: [NewsCard, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  readonly lang = inject(LanguageService);
  readonly profile = profile;
  readonly lead = heroLead;
  readonly stats = stats;
  readonly districts = districts;
  readonly voterDistricts = voterDistricts;
  readonly points = manifestoPoints.slice(0, 6);
  readonly news = toSignal(inject(NewsService).page(1, 3), {
    initialValue: { items: [], page: 1, pageSize: 3, total: 0 },
  });
  readonly albums = albums;
}
