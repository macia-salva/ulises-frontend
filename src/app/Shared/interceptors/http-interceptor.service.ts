import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthDTO } from 'src/app/Modules/auth/models/auth.dto';
import { AuthService } from 'src/app/Modules/auth/services/auth.service';
import { AuthStorageService } from '../services/auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  private username: string = '';
  private access_token: string = '';
  private refresh_token: string = '';
  private isRefreshing: boolean = false;
  private device_number: number = 0;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private authStorageService: AuthStorageService,    
    private router: Router,

  ) {
    this.buidCredentials();
    this.subscription = authStorageService.change.subscribe(() => 
    {
      this.buidCredentials();
    }
    );    
  }

  buidCredentials() {
    const auth=this.authStorageService.getAuth();
    if (auth) {
      this.access_token = '';
      this.refresh_token = '';
      this.username = auth.username;
      if (auth.access_token) {
        this.access_token = auth.access_token;
      }
      if (auth.refresh_token) {
        this.refresh_token = auth.refresh_token;
      }
    };

  }
  // https://www.bezkoder.com/angular-12-refresh-token/

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.access_token) {
      req = this.addTokenHeader(req, this.access_token);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          (req.url.includes('authentication/continueSession') || !req.url.includes('authentication')) &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      if (this.access_token)
        return this.authService
          .refreshToken(
            new AuthDTO(
              this.username,
              this.access_token,
              this.refresh_token,
              false,
              0,
              []
            )
          )
          .pipe(
            switchMap((authDTO: AuthDTO) => {
              this.isRefreshing = false;
              this.authStorageService.setAuth(authDTO);
              return next.handle(
                this.addTokenHeader(request, authDTO.access_token)
              );
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.authStorageService.cleanAuth();
              this.router.navigateByUrl('auth/login');
              return throwError(err);
            })
          );
    }
    return throwError('Handle 401 while refreshing');
  }

  private addTokenHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    /* for Spring Boot back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    /* for Node.js Express back-end */
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
