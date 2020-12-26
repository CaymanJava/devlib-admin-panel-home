import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducers } from './store/reducer/reducer';
import { AuthEffects } from './store/effect/app-effects.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('[STORE] action ', action.type);
    return reducer(state, action);
  };
}

const metaReducers: MetaReducer[] = [debug];

@NgModule({
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, environment.production === true ? {} : {metaReducers}),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {

}
