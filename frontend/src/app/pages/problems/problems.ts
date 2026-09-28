import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/language.service';
import { ToastService } from '../../core/toast.service';
import { profile, voterDistricts } from '../../data/site';
import { Text } from '../../data/types';

interface FieldErrors {
  name?: string;
  phone?: string;
  district?: string;
  topic?: string;
  detail?: string;
}

@Component({
  selector: 'app-problems',
  imports: [FormsModule],
  templateUrl: './problems.html',
})
export class Problems {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  readonly lang = inject(LanguageService);
  readonly profile = profile;
  readonly districts = voterDistricts;
  readonly topics: { id: string; label: Text }[] = [
    { id: 'pension', label: { mr: 'जुनी पेन्शन व निवृत्ती', en: 'Old pension and retirement' } },
    { id: 'seniority', label: { mr: 'सेवाज्येष्ठता व पदोन्नती', en: 'Seniority and promotion' } },
    { id: 'transfer', label: { mr: 'बदली', en: 'Transfer' } },
    { id: 'salary', label: { mr: 'वेतन व भत्ते', en: 'Salary and allowances' } },
    { id: 'medical', label: { mr: 'वैद्यकीय सुविधा', en: 'Medical facilities' } },
    { id: 'aided', label: { mr: 'अनुदानित / विनाअनुदानित', en: 'Aided or unaided post' } },
    { id: 'school', label: { mr: 'शाळेतील सुविधा', en: 'School facilities' } },
    { id: 'other', label: { mr: 'इतर', en: 'Other' } },
  ];
  private static readonly INDIAN_MOBILE = /^[6-9]\d{9}$/;
  name = '';
  phone = '';
  district = '';
  school = '';
  topic = '';
  detail = '';
  readonly errors = signal<FieldErrors>({});

  submit(event: Event): void {
    event.preventDefault();
    const mr = this.lang.lang() === 'mr';
    const name = this.name.trim();
    const phone = this.phone.trim().replace(/[\s-]/g, '').replace(/^(\+?91)/, '');
    const district = this.district.trim();
    const topic = this.topic.trim();
    const detail = this.detail.trim();

    const errors: FieldErrors = {};
    if (name.length < 3) {
      errors.name = mr ? 'कृपया पूर्ण नाव टाका.' : 'Please enter your full name.';
    }
    if (!Problems.INDIAN_MOBILE.test(phone)) {
      errors.phone = mr ? 'कृपया वैध १० अंकी मोबाईल क्रमांक टाका.' : 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!district) {
      errors.district = mr ? 'कृपया जिल्हा निवडा.' : 'Please choose a district.';
    }
    if (!topic) {
      errors.topic = mr ? 'कृपया समस्येचा विषय निवडा.' : 'Please choose a topic.';
    }
    if (detail.length < 10) {
      errors.detail = mr ? 'कृपया समस्येचे थोडे सविस्तर वर्णन द्या.' : 'Please describe the problem in a bit more detail.';
    }
    this.errors.set(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    this.http.post('/api/problems', {
      name,
      phone,
      district,
      school: this.school.trim(),
      topic,
      detail,
    }).subscribe({
      next: () => {
        this.toast.success(this.lang.lang() === 'mr' ? 'समस्या नोंदली गेली.' : 'The problem has been recorded.');
        this.name = '';
        this.phone = '';
        this.district = '';
        this.school = '';
        this.topic = '';
        this.detail = '';
        this.errors.set({});
      },
      error: () => {
        this.toast.error(this.lang.lang() === 'mr' ? 'नोंद जतन होऊ शकली नाही. पुन्हा प्रयत्न करा.' : 'The problem could not be saved. Try again.');
      },
    });
  }
}
