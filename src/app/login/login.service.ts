import { inject, Injectable } from '@angular/core';
import { AuthenticationRequestModel, AuthenticationResponseModel } from '../model/gestion-bibliotheque.model';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from '../util/http-error-handler-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL_LOGIN_SERVICE = 'http://localhost:8080/api/auth/authenticate';
  private readonly httpClient = inject(HttpClient);
  private readonly httpErrorHandlerService = inject(HttpErrorHandlerService);

  login(data: AuthenticationRequestModel): Observable<AuthenticationResponseModel> {
    return this.httpClient.post<AuthenticationResponseModel>(this.URL_LOGIN_SERVICE, data)
      .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

}
