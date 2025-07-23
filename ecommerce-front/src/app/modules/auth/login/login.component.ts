import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error('Error detallado:', err);
        this.error = err.error?.message || 'Cliente no encontrado';
      },
    });
  }
}
