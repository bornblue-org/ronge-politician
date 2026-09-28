import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { aboutLead, awards, campus, experience, institutions, profile, socialWork, universityWork } from '../../data/site';
import { Text } from '../../data/types';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
})
export class About {
  readonly lang = inject(LanguageService);
  readonly profile = profile;
  readonly lead = aboutLead;
  readonly blocks: { title: Text; items: Text[] }[] = [
    { title: { mr: 'अनुभव', en: 'Experience' }, items: experience },
    { title: { mr: 'शैक्षणिक संस्था', en: 'Institutions' }, items: institutions },
    { title: { mr: 'परिसराची वाटचाल', en: 'How the campus grew' }, items: campus },
    { title: { mr: 'सामाजिक कार्य', en: 'Social work' }, items: socialWork },
    { title: { mr: 'विद्यापीठ कामकाज', en: 'University work' }, items: universityWork },
  ];
  readonly awards = awards;
}
