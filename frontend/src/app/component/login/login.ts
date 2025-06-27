import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  providers: [AuthService]
})
export class Login {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  loginData = {
    email: '',
    password: '',
  };

  registerData = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleMode() {
    this.error = null;
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    this.isLoading = true;
    this.error = null;

    this.authService.login({
      email: this.loginData.email,
      password: this.loginData.password
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Store the token for future use
        localStorage.setItem('token', response.access_token);
        void this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error?.message || 'Login failed';
      }
    });
  }

  onRegister() {
    this.isLoading = true;
    this.error = null;

    this.authService.register({
      email: this.registerData.email,
      password: this.registerData.password
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.error = null;
        // Switch to login mode after successful registration
        this.isLoginMode = true;
        // Pre-fill the login form with the registered email
        this.loginData.email = this.registerData.email;
        this.loginData.password = '';
        // Clear registration data
        this.registerData = { name: '', email: '', password: '' };
        // Show success message
        this.error = 'Registration successful! Please sign in with your new account.';
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 409) {
          this.error = 'Email already exists. Please use a different email or try logging in.';
        } else {
          this.error = error.error?.message || 'Registration failed';
        }
      }
    });
  }
}
