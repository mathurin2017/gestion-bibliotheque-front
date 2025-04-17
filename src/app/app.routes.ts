import { Routes } from '@angular/router';
import { HOME, SIGNUP } from './enum/routes';
import { authGuard } from './guard/auth.guard';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => [
      {
        path: '',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
      },
      {
        path: SIGNUP,
        loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
      },
      {
        path: HOME,
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        canActivate: [authGuard],

      }
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];
