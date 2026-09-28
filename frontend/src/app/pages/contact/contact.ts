import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/language.service';
import { ToastService } from '../../core/toast.service';
import { profile } from '../../data/site';

interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  readonly lang = inject(LanguageService);
  private readonly toast = inject(ToastService);
  readonly profile = profile;
  private static readonly INDIAN_MOBILE = /^[6-9]\d{9}$/;
  private static readonly EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  name = '';
  phone = '';
  email = '';
  area = '';
  message = '';
  readonly errors = signal<FieldErrors>({});

  submit(event: Event): void {
    event.preventDefault();
    const mr = this.lang.lang() === 'mr';
    const name = this.name.trim();
    const phone = this.phone.trim().replace(/[\s-]/g, '').replace(/^(\+?91)/, '');
    const email = this.email.trim();
    const message = this.message.trim();

    const errors: FieldErrors = {};
    if (name.length < 3) {
      errors.name = mr ? 'कृपया पूर्ण नाव टाका.' : 'Please enter your full name.';
    }
    if (!Contact.INDIAN_MOBILE.test(phone)) {
      errors.phone = mr ? 'कृपया वैध १० अंकी मोबाईल क्रमांक टाका.' : 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (email && !Contact.EMAIL.test(email)) {
      errors.email = mr ? 'कृपया वैध ईमेल पत्ता टाका.' : 'Please enter a valid email address.';
    }
    if (message.length < 10) {
      errors.message = mr ? 'कृपया तुमचा संदेश थोडा सविस्तर लिहा.' : 'Please write a bit more in your message.';
    }
    this.errors.set(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const subject = encodeURIComponent(mr ? 'वेबसाइटवरून संदेश' : 'Message from the website');
    const body = encodeURIComponent(`${name}\n${phone}\n${email}\n${this.area.trim()}\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    this.toast.success(mr ? 'आपला ईमेल प्रोग्राम उघडला जाईल.' : 'Your email app will open with this message.');
  }
}
