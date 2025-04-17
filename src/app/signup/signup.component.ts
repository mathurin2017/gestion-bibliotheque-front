import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { RoleEmun } from '../enum/role-emun';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { UtilisateurModel } from '../model/gestion-bibliotheque.model';

@Component({
  selector: 'app-signup',
  imports: [
    MatCardModule,
    MatCardHeader,
    MatToolbarModule,
    MatCardContent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    NgForOf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(Router);
  private readonly signupService = inject(SignupService);

  signupForm: FormGroup = new FormGroup({});
  roles = signal(Object.values(RoleEmun).filter(value => typeof value === 'string'));

  constructor() { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmMotDePasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      console.log('onSignup ', this.signupForm.value);
      const { confirmMotDePasse, ...data } = this.signupForm.value;
      console.log('data ', data as UtilisateurModel);
      this.signupService.signup(data as UtilisateurModel).subscribe({
        next: response => this.route.navigateByUrl(''),
        error: err => console.error(err)
      });
    }
  }

  onBack() {
    this.route.navigateByUrl('');
  }
}
