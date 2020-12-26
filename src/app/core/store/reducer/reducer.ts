import { ActionReducerMap } from '@ngrx/store';
import * as fromLogin from './login.reducer';
import * as fromAppUser from './app-user.reducer';

export interface AppModuleState {
  loginState: fromLogin.LoginState;
  appUserState: fromAppUser.AppUserState;
}

export const reducers: ActionReducerMap<AppModuleState> = {
  appUserState: fromAppUser.reducer,
  loginState: fromLogin.reducer,
};
