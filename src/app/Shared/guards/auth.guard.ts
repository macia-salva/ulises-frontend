import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { checkAllowedOption } from '../model/security-manager';
import { AuthStorageService } from '../services/auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
//  authentication?: AuthDTO;

  constructor(
    private router: Router, 
    private authStorageService: AuthStorageService,
    ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    
    const auth= this.authStorageService.getAuth();
    if (auth) {
      if (auth.access_token) {
        if (route.data.option) {
          let isAllowed = checkAllowedOption(
            auth,
            route.data.option
          );
          if (!isAllowed) {
            this.router.navigate(['home']);
            return false;
          }
        }
        return true;
      }
    }
    alert("Can navigate");

    this.router.navigate(['auth/login']);

    return false;
  }
}
