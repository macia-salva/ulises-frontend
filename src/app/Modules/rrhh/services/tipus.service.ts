import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { AdscPuesDTO } from '../model/adscpues.dto';
import { AdscPlazDTO } from '../model/adscplaz.dto';
import { SituPueDTO } from '../model/situpue.dto';
import { SituPlazDTO } from '../model/situplaz.dto';
import { EntitatDTO } from '../model/entitat.dto';
import { Centtra1DTO } from '../model/centtra1.dto';
import { Centtra2DTO } from '../model/centtra2.dto';
import { Centtra3DTO } from '../model/centtra3.dto';
import { Centtra4DTO } from '../model/centtra4.dto';
import { Centtra5DTO } from '../model/centtra5.dto';
import { TiposRptDTO } from '../model/tiposrpt.dto';
import { SituadminDTO } from '../model/situadmin.dto';
import { NaturelaDTO } from '../model/naturela.dto';
import { NatuplazaDTO } from '../model/natuplaza.dto';
import { GrupoDTO } from '../model/grupos.dto';

@Injectable({
  providedIn: 'root',
})
export class TipusService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = apiconfig.apiurl + 'RRHH/Tipus';
  }

  getAdscPues(): Observable<AdscPuesDTO[]> {
    return this.http.get<AdscPuesDTO[]>(
      this.urlApi + '/adscpue'
    );
  }

  getGrupos(): Observable<GrupoDTO[]> {
    return this.http.get<GrupoDTO[]>(
      this.urlApi + '/grupos'
    );
  }

  getAdscPlaz(): Observable<AdscPlazDTO[]> {
    return this.http.get<AdscPlazDTO[]>(
      this.urlApi + '/adscplaz'
    );
  }

  getSituPues(): Observable<SituPueDTO[]> {
    return this.http.get<SituPueDTO[]>(
      this.urlApi + '/situpue'
    );
  }

  getSituPlaz(): Observable<SituPlazDTO[]> {
    return this.http.get<SituPlazDTO[]>(
      this.urlApi + '/situplaz'
    );
  }  

  getEntitats(): Observable<EntitatDTO[]> {
    return this.http.get<EntitatDTO[]>(
      this.urlApi + '/entitats'
    );
  }  

  getCenttra1(): Observable<Centtra1DTO[]> {
    return this.http.get<Centtra1DTO[]>(
      this.urlApi + '/centtra1'
    );
  }    

  getCenttra2(): Observable<Centtra2DTO[]> {
    return this.http.get<Centtra2DTO[]>(
      this.urlApi + '/centtra2'
    );
  }    

  getCenttra3(): Observable<Centtra3DTO[]> {
    return this.http.get<Centtra3DTO[]>(
      this.urlApi + '/centtra3'
    );
  }    

  getCenttra4(): Observable<Centtra4DTO[]> {
    return this.http.get<Centtra4DTO[]>(
      this.urlApi + '/centtra4'
    );
  }    

  getCenttra5(): Observable<Centtra5DTO[]> {
    return this.http.get<Centtra5DTO[]>(
      this.urlApi + '/centtra5'
    );
  }    

  getTipusRpt(): Observable<TiposRptDTO[]> {
    return this.http.get<TiposRptDTO[]>(
      this.urlApi + '/tipusrpt'
    );
  }
  
  getSituAdmins(): Observable<SituadminDTO[]> {
    return this.http.get<SituadminDTO[]>(
      this.urlApi + '/situadmins'
    );
  }

  getNaturelacions(): Observable<NaturelaDTO[]> {
    return this.http.get<NaturelaDTO[]>(
      this.urlApi + '/naturelacions'
    );
  }


  getNatuplazas(): Observable<NatuplazaDTO[]> {
    return this.http.get<NatuplazaDTO[]>(
      this.urlApi + '/natuplaces'
    );
  }  
}
