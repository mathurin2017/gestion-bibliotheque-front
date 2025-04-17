import { Injectable } from '@angular/core';
import { AUTH_TOKEN } from '../enum/routes';
import { AuthenticationResponseModel } from '../model/gestion-bibliotheque.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(AUTH_TOKEN);
  }

  login(token: AuthenticationResponseModel): void {
    sessionStorage.setItem(AUTH_TOKEN, token.toString());
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_TOKEN);
  }

}
