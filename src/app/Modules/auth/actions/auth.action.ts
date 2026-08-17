import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../models/auth.dto';
import { LoginDTO } from '../models/login.dto';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: LoginDTO }>()
);

export const changePassword = createAction(
  '[Login Page] ChangePassword',
  props<{ credentials: LoginDTO }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ credentials: AuthDTO }>()
);

export const changeSuccess = createAction(
  '[Login Page] Change Success',
  props<{ credentials: AuthDTO }>()
);

export const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const changeFailure = createAction(
  '[Login Page] Chnage Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[Login Page] Logout');
