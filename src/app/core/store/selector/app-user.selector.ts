import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppModuleState } from '../reducer/reducer';

export const getAuthState = createFeatureSelector<AppModuleState>('app');

export const selectAuthUserState = createSelector(
  getAuthState,
  state => state.appUserState
);

export const selectUser = createSelector(
  selectAuthUserState,
  state => state.appUser
);
