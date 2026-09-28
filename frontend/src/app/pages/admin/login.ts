import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class AdminLogin {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  username = '';
  password = '';

  constructor() {
    if (this.auth.token()) {
      void this.router.navigate(['/admin']);
    }
  }

  submit(event: Event): void {
    event.preventDefault();
    this.auth.login(this.username.trim(), this.password).subscribe({
      next: () => void this.router.navigate(['/admin']),
      error: (err: HttpErrorResponse) => {
        this.toast.error(err.status === 401 ? 'Wrong username or password.' : 'Could not reach the server.');
      },
    });
  }
}
