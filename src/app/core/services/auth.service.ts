import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { LoggerService } from '@ngx-toolkit/logger';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { AppUser } from '../models/user.model';
import { map, tap } from 'rxjs/operators';
import { LoginCredentials, RegisterData, RegistrationResponse, TokenInfo } from '../models/auth.model';

const routes = {
  tokens: () => `/tokens`,
  refreshToken: () => `/tokens/refresh`,
  registration: () => `/registration`,
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _log: LoggerService,
              private _tokenService: TokenService,
              private _userService: UserService,
              private _api: ApiService,
              private _router: Router) {
  }

  getAppUser(): Observable<AppUser> {
    if (this._tokenService.getAccessToken() !== undefined) {
      return this._userService.getUser()
        .pipe(
          map(user => AppUser.loggedUser(user))
        );
    }
    return of(AppUser.unloggedUser());
  }

  register(data: RegisterData): Observable<any> {
    return this._api.post(routes.registration(), data, false)
      .pipe(
        map((response: HttpResponse<any>) => {
          return <RegistrationResponse> response.body;
        })
      );
  }

  login(data: LoginCredentials): Observable<void> {
    return this._api.post(routes.tokens(), data, false)
      .pipe(
        tap(token => this._tokenService.setTokens(token.body))
      );
  }

  refreshAccess(): Observable<TokenInfo> {
    return this._api.post(routes.refreshToken(), {refreshToken: this._tokenService.getRefreshToken()}, false)
      .pipe(tap(token =>
        this._tokenService.setTokens(token.body))
      );
  }

  logout() {
    this._tokenService.removeTokens();
    this._router.navigate(['/session/login']);
  }

}
