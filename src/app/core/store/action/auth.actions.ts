import { createAction, props } from '@ngrx/store';
import { AppUser } from '../../models/user.model';
import { LoginCredentials } from '../../models/auth.model';

export const loadUser = createAction('[Auth] Load user');

export const setUser = createAction('[Auth] Set app user', props<{ user: AppUser }>());
export const login = createAction('[Auth] Login', props<{ credentials: LoginCredentials }>());
export const loginSuccess = createAction('[Auth] Login success');
export const loginError = createAction('[Auth] Login error');

export const logout = createAction('[Auth] Logout');
