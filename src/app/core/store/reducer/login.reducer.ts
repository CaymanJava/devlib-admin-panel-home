import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from '../action/auth.actions';

export interface LoginState {
  loading: boolean;
  error: boolean;
}

export const initialState: LoginState = {
  loading: false,
  error: false,
};

const loginReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => (
    {
      ...state,
      loading: true,
      error: false
    }
  )),
  on(LoginActions.loginSuccess, state => (
    {
      ...state,
      loading: false,
      error: false
    }
  )),
  on(LoginActions.loginError, state => (
    {
      ...state,
      loading: false,
      error: true
    }
  ))
);

export function reducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
