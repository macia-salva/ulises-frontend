import { Action, createReducer, on } from '@ngrx/store';
import {
  changeFailure,
  changePassword,
  changeSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from '../actions';
import { AuthDTO } from '../models/auth.dto';

export interface AuthState {
  authentication: AuthDTO;
  processing: boolean;
  logged: boolean;
  passwordChanged: boolean;
  error: any;
}

export const initialState: AuthState = {
  authentication: new AuthDTO('', '', '',0, false, false, '', []),
  processing: false,
  logged: false,
  passwordChanged: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    processing: true,
    logged: false,
    error: null,
  })),
  on(changePassword, (state) => ({
    ...state,
    error: null,
  })),
  on(loginSuccess, (state, action) => ({
    ...state,
    authentication: action.credentials,
    processing: false,
    logged: true,
    error: null,
  })),
  on(changeSuccess, (state, action) => ({
    ...state,
    authentication: {
      ...state.authentication,
      canviPassword: false,
    },
    processing: false,
    passwordChanged: true,
    error: null,
  })),
  on(loginFailure, (state, { payload }) => ({
    ...state,
    authentication: new AuthDTO('', '', '', 0, false, false, '', []),
    processing: false,
    logged: false,
    error: { payload },
  })),
  on(changeFailure, (state, { payload }) => ({
    ...state,
    error: { payload },
  })),
  on(logout, () => initialState)
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}
