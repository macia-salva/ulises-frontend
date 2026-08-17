import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { checkAllowedOption } from '../../model/security-manager';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthStorageService } from '../../services/auth-storage.service';
import { Time } from '@angular/common';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss'],
})
export class HeadermenuComponent implements OnInit , OnDestroy {
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  showRRHHSigpOption: boolean;
  showRRHHCarreraOption: boolean;
  endsesion:number | undefined;
  endDate: Date;
  currentDate: Date;
  username: string;
  subscription: Subscription;
  time_subscription: Subscription;
  avisatSessio: boolean;

  constructor(
    private router: Router, 
    private authStorageService: AuthStorageService,
    private localStorageService: LocalStorageService,
    ) {
    this.showAuthSection = false;
    this.showRRHHSigpOption = false;
    this.showRRHHCarreraOption = false;
    this.showNoAuthSection = true;
    this.endDate=new Date(0);
    this.currentDate=new Date(0);
    this.avisatSessio=false;
    this.username = '';
    this.makeMenu();
    this.time_subscription = timer(0, 60000)
    .pipe(
      map(() => new Date()),
      share()
    )
    .subscribe(time => {
      this.currentDate = time;
    });
    
    this.subscription = authStorageService.change.subscribe(() => 
    {
       this.makeMenu();
    }
    );    
  }
  getExpTime():string {
    const endSesion=this.authStorageService.getAuth()?.endsesion;
    if (endSesion) {
      if (endSesion<this.currentDate.getTime()) {
        if (!this.avisatSessio) {
          alert("Su sessión acaba de finalizar");
          this.avisatSessio=true;
        }
        return "Sesión finalizada"
      }
      else {
        const m=Math.trunc((endSesion-this.currentDate.getTime())/60000)+1;
        return (m<10?"0"+m:m.toString())+":00";
      }
    }
    else {
      return '';
    }
  }

  makeMenu() {
    const auth=this.authStorageService.getAuth();
    if (auth) {
      this.username = auth.username;
      this.endsesion=auth.endsesion;
      this.showAuthSection = false;
      this.showNoAuthSection = true;
      if (auth.access_token) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
        this.showRRHHCarreraOption =
          !auth.canviPassword &&
          checkAllowedOption(auth, 'RRHH_CARRERA');
        this.showRRHHSigpOption =
          !auth.canviPassword &&
          checkAllowedOption(auth, 'RRHH_SIGP');      
        }
    }
    else {
      this.showAuthSection = false;
      this.showRRHHCarreraOption = false;
      this.showNoAuthSection = true;
      this.endsesion=0;
      this.username = '';
    }

  }

  ngOnInit(): void {}

  login(): void {
    this.router.navigateByUrl('auth/login');
  }

  personal():void {
    this.router.navigateByUrl('rrhh/personal-list');
  }

  carrera():void {
    this.router.navigateByUrl('carrera/convocatoria-list');
  }


  changePassword(): void {
    this.router.navigateByUrl('auth/change-password');
  }

  logout(): void {
    this.authStorageService.cleanAuth();
//    this.makeMenu();
    this.router.navigateByUrl('auth/login');
  }

  help(): void {
  }

  sync(): void {
    this.localStorageService.cleanStorage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.time_subscription.unsubscribe();
  }  
}
