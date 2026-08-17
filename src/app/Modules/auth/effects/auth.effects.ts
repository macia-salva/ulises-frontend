import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as AuthActions from '../actions';
import { AuthDTO } from '../models/auth.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
    this.responseOK = false;
  }
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((authToken: AuthDTO) => {
            return AuthActions.loginSuccess({ credentials: authToken });
          }),
          catchError((error) => {
            return of(AuthActions.loginFailure({ payload: error }));
          })
        )
      )
    )
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      exhaustMap(({ credentials }) =>
        this.authService.changePassword(credentials).pipe(
          map((authToken: AuthDTO) => {
            return AuthActions.changeSuccess({ credentials: authToken });
          }),
          catchError((error) => {
            return of(AuthActions.changeFailure({ payload: error }));
          })
        )
      )
    )
  );
}
