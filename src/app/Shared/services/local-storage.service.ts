import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDTO } from 'src/app/Modules/auth/models/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
  ) {}

  set(key: string, value: any) {
    
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const value=localStorage.getItem(key);
    let obj=null;
    if (value) {
      obj=JSON.parse(value);
    }
    return obj;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  cleanStorage() {

        let keys = Object.keys(localStorage);
        let i = keys.length;

        while ( i-- ) {
          if(keys[i].startsWith('SancionsCalvia') || keys[i].startsWith('RRHHCalvia')) {
            localStorage.removeItem(keys[i]);
          }       
        }

  } 
  

}
