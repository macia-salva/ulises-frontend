import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { RoleDTO } from '../../auth/models/role.dto';
import { UsuariDTO } from '../model/usuari.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuariService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = apiconfig.apiurl + 'usuari';
  }

  filterUsers(filter: string): Observable<UsuariDTO[]> {
    return this.http.get<UsuariDTO[]>(this.urlApi + '/list?filter=' + filter);
  }

  addUser(usuari: UsuariDTO): Observable<UsuariDTO> {
    return this.http.post<UsuariDTO>(this.urlApi, usuari);
  }

  updateUser(usuari: UsuariDTO): Observable<UsuariDTO> {
    return this.http.put<UsuariDTO>(this.urlApi, usuari);
  }

  getUser(kusuari: string): Observable<UsuariDTO> {
    return this.http.get<UsuariDTO>(this.urlApi + '/' + kusuari);
  }

  getRoleList(): Observable<RoleDTO[]> {
    return this.http.get<RoleDTO[]>(this.urlApi + '/listroles');
  }
}
