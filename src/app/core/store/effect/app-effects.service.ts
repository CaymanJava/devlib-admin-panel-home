import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as AuthActions from '../action/auth.actions';
import { AppUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  @Effect()
  loginSuccess$ =
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => AuthActions.loadUser())
    );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(AuthActions.loadUser),
    exhaustMap(() => this.authService.getAppUser().pipe(
      map(appUser => AuthActions.setUser({user: appUser})),
      catchError(() => of(AuthActions.setUser({user: AppUser.unloggedUser()})))
    ))
  );

  @Effect({dispatch: false})
  setUser$ = this.actions$.pipe(
    ofType(AuthActions.setUser),
    tap(() => {
      if (this.router.url.indexOf('session') > 0) {
        this.router.navigate(['/dashboard']);
      }
    })
  );

  @Effect()
  logout$ =
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => AuthActions.setUser({user: AppUser.unloggedUser()}))
    );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

}
