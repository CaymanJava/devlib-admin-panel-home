import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private _tokenService: TokenService,
              private _router: Router) {
  }

  canActivate(): boolean {
    const notLogged = this._tokenService.getAccessToken() === undefined;

    if (!notLogged) {
      this._router.navigate(['/dashboard']);
    }

    return notLogged;
  }

}
