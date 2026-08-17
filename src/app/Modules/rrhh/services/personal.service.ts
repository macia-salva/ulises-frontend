import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { PersonalDTO } from '../model/personal.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = apiconfig.apiurl + 'RRHH/Personal';
  }

  filterByDocument(document: string): Observable<PersonalDTO[]> {
    return this.http.get<PersonalDTO[]>(
      this.urlApi + '/filterByDocument?document=' + document
    );
  }

  filterByCodi(codienti: string, codiempl: string): Observable<PersonalDTO[]> {
    return this.http.get<PersonalDTO[]>(
      this.urlApi + '/filterByCodi?codienti=' + codienti + '&codiempl=' + codiempl
    );
  }


  filterByNom(apellid1: string, apellid2: string): Observable<PersonalDTO[]> {
    return this.http.get<PersonalDTO[]>(
      this.urlApi + '/filterByNom?apellid1=' + apellid1 + '&apellid2=' + apellid2
    );
  }


}
