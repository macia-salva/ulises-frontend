import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthDTO } from 'src/app/Modules/auth/models/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor(
  ) {}

  setAuth(auth:AuthDTO) {
    localStorage.setItem('AuthCalvia',  JSON.stringify(auth));
    this.change.emit();
  }

  getAuth():AuthDTO | null {
    const srt_auth=localStorage.getItem('AuthCalvia');
    if (srt_auth) return JSON.parse(srt_auth);
    else return null;
  }

  cleanAuth() {
    localStorage.removeItem('AuthCalvia');
    this.change.emit();
  }

  @Output() change: EventEmitter<boolean> = new EventEmitter();  

}
