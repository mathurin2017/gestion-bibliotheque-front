import { Component, inject, OnInit } from '@angular/core';
import { MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './login.service';
import { AuthenticationRequestModel } from '../model/gestion-bibliotheque.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HOME, SIGNUP } from '../enum/routes';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatCardHeader,
    MatToolbarModule,
    MatCardContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly route = inject(Router);

  loginForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    console.log('onLogin ', this.loginForm.value);
    const data: AuthenticationRequestModel = this.loginForm.value;
    this.loginService.login(data).subscribe({
      next: response => {
        this.authService.login(response);
        this.route.navigate([HOME]);
      },
      error: err => console.error(err)
    })
  }

  onSignup() {
    this.route.navigateByUrl(SIGNUP);
  }
}
