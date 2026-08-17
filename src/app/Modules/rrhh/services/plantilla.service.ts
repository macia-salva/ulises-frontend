import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { RelPlazPersDTO } from '../model/relplazpers.dto'
import { YPlazaDTO } from '../model/yplaza.dto';
import { YFasePlazVDTO } from '../model/yfaseplazv.dto';

@Injectable({
  providedIn: 'root',
})
export class PlantillaService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = apiconfig.apiurl + 'RRHH/Plantilla';
  }

  relacioPlacesEmpl(codienti: string, codiempl: string): Observable<RelPlazPersDTO[]> {
    return this.http.get<RelPlazPersDTO[]>(
      this.urlApi + '/relacioPlacesEmpl?codienti=' + codienti + '&codiempl=' + codiempl
    );
  }

  nomsPlaces(): Observable<YPlazaDTO[]> {
    return this.http.get<YPlazaDTO[]>(this.urlApi + '/nomsplaces');
  }  

  addYfaseplazv(yfaseplaz: YFasePlazVDTO): Observable<YFasePlazVDTO> {
    return this.http.post<YFasePlazVDTO>(
      this.urlApi + '/yfaseplazv',
      yfaseplaz
    );
  }

  updateYfaseplazv(yfaseplaz: YFasePlazVDTO): Observable<YFasePlazVDTO> {
    return this.http.put<YFasePlazVDTO>(
      this.urlApi + '/yfaseplazv',
      yfaseplaz
    );
  }

  deleteYfaseplazv(yfaseplaz: YFasePlazVDTO): Observable<Object> {
    return this.http.delete<YFasePlazVDTO>(
      this.urlApi +
        '/yfaseplazv/' +
        yfaseplaz.id.codienti +
        '/' +
        yfaseplaz.id.coditpla +
        '/' +
        yfaseplaz.id.codiplaz +
        '/' +
        yfaseplaz.id.natuplaz +
        '/' +
        yfaseplaz.id.numefase +
        '/' +
        yfaseplaz.id.versfase
    );
  }


}