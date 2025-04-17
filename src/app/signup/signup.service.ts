import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from '../util/http-error-handler-service';
import { UtilisateurModel } from '../model/gestion-bibliotheque.model';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private readonly URL_SIGNUP_SERVICE = 'http://localhost:8080/api/utilisateur/signup';
  private readonly httpClient = inject(HttpClient);
  private readonly httpErrorHandlerService = inject(HttpErrorHandlerService);

  signup(data: UtilisateurModel): Observable<UtilisateurModel> {
    return this.httpClient.post<UtilisateurModel>(this.URL_SIGNUP_SERVICE, data)
      .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

}
