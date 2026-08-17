import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { RelPuePersDTO } from '../model/relpuepers.dto';
import { YPuesTrabVDTO } from '../model/ypuestrabv.dto';
import { YFasePuesVDTO } from '../model/yfasepuesv.dto';
import { SrvprevDTO } from '../model/srvprev.dto';

@Injectable({
  providedIn: 'root',
})
export class RptService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = apiconfig.apiurl + 'RRHH/Rpt';
  }

  relacioLlocsEmpl(
    codienti: string,
    codiempl: string
  ): Observable<RelPuePersDTO[]> {
    return this.http.get<RelPuePersDTO[]>(
      this.urlApi +
        '/relacioLlocsEmpl?codienti=' +
        codienti +
        '&codiempl=' +
        codiempl
    );
  }


  relacioServPrestats(
    codiempl: string
  ): Observable<SrvprevDTO[]> {
    return this.http.get<SrvprevDTO[]>(
      this.urlApi +
        '/relacioServPrestats?codiempl=' +
        codiempl
    );
  }  

  nomsLlocs(): Observable<YPuesTrabVDTO[]> {
    return this.http.get<YPuesTrabVDTO[]>(this.urlApi + '/nomsllocs');
  }

  addYfsepuev(yfasepuesv: YFasePuesVDTO): Observable<YFasePuesVDTO> {
    return this.http.post<YFasePuesVDTO>(
      this.urlApi + '/yfasepuesv',
      yfasepuesv
    );
  }

  updateYfsepuev(yfasepuesv: YFasePuesVDTO): Observable<YFasePuesVDTO> {
    return this.http.put<YFasePuesVDTO>(
      this.urlApi + '/yfasepuesv',
      yfasepuesv
    );
  }

  deleteYfsepuev(yfasepuesv: YFasePuesVDTO): Observable<Object> {
    return this.http.delete<YFasePuesVDTO>(
      this.urlApi +
        '/yfasepuesv/' +
        yfasepuesv.id.codienti +
        '/' +
        yfasepuesv.id.coditrpt +
        '/' +
        yfasepuesv.id.codipues +
        '/' +
        yfasepuesv.id.numedota +
        '/' +
        yfasepuesv.id.numefase +
        '/' +
        yfasepuesv.id.versfase
    );
  }

  deletServPrestats(srvprev: SrvprevDTO): Observable<Object> {
    return this.http.delete<SrvprevDTO>(
      this.urlApi +
        '/relacioServPrestats/' +
        srvprev.id.codienti +
        '/' +
        srvprev.id.codiempl +
        '/' +
        srvprev.id.codiserv 
    );
  }  
}
