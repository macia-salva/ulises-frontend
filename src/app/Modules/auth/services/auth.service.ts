import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { AuthDTO } from '../models/auth.dto';
import { LoginDTO } from '../models/login.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = apiconfig.apiurl;
  }

  login(login: LoginDTO): Observable<AuthDTO> {
    return this.http.post<AuthDTO>(this.urlApi + 'authentication', login);
  }

  changePassword(login: LoginDTO): Observable<AuthDTO> {
    return this.http.post<AuthDTO>(
      this.urlApi + 'usuari/changePassword',
      login
    );
  }

  refreshToken(authDTO: AuthDTO): Observable<AuthDTO> {
    return this.http.post<AuthDTO>(
      this.urlApi + 'authentication/refreshToken',
      authDTO
    );
  }

  newDevice(login: LoginDTO): Observable<number> {
    return this.http.post<number>(this.urlApi + 'authentication/newDevice', login);
  }

  continueSession(): Observable<any> {
    return this.http.get(this.urlApi + 'authentication/continueSession');
  }
}
