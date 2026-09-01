import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiconfig } from 'src/app/Shared/model/apitool';
import { CpConvocatoriaDTO } from "../model/cpconvocatoria.dto";
import { CpParticipacioDTO } from "../model/cpparticipacio.dto";
import { CpResultatParticipacioDTO } from "../model/cpresultatparticipacio.dto";
import { CpCursAportatDTO } from "../model/cpcursaportat.dto";
import { CpTitolAportatDTO } from "../model/cptitolaportat.dto";
import { CpAvaluacioDTO } from "../model/cpavaluacio.dto";
import { CpResultatAvaluacioDTO } from "../model/cpresultatavaluacio.dto";


@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private urlApi: string;

  constructor(private http: HttpClient) {
    this.urlApi = apiconfig.apiurl + 'RRHH/Carrera';
  }
  
  findConvocatories(): Observable<CpConvocatoriaDTO[]> {
    return this.http.get<CpConvocatoriaDTO[]>(
      this.urlApi + '/findConvocatories'
    );
  }
  
  deleteConvocatoria(kconv: number): Observable<void> {
    return this.http.delete<void>(
      `${this.urlApi}/eliminarConvocatoria/${kconv}`
    );
  }

  findPartipacions(kconv: number): Observable<CpParticipacioDTO[]> {
    return this.http.get<CpParticipacioDTO[]>(
      this.urlApi + '/obternirParticipantsConvocatoria?kconvocatoria='+kconv
    );
  }

  afegirParticipacio(kconv: number, codiempl: string, datareg: string, questionari: string, grup:string, nivell:string): Observable<CpParticipacioDTO> {
    return this.http.get<CpParticipacioDTO>(
      this.urlApi + '/afegirParticipacio?kconvocatoria='+kconv+'&codiempl='+codiempl+'&questionari='+questionari+'&grup='+grup+'&nivell='+nivell+'&datareg='+datareg
    );
  }

  afegirConvocatoria(conv: CpConvocatoriaDTO): Observable<CpConvocatoriaDTO> {
    return this.http.post<CpConvocatoriaDTO>(
      this.urlApi + '/afegirConvocatoria',
      conv
    );
  } 

  tancarConvocatoria(conv: CpConvocatoriaDTO): Observable<CpConvocatoriaDTO> {
    return this.http.put<CpConvocatoriaDTO>(
      this.urlApi + '/tancarConvocatoria',
      conv
    );
  } 
  

  obtenirPartipacio(part : CpParticipacioDTO): Observable<CpResultatParticipacioDTO> {
    return this.http.get<CpResultatParticipacioDTO>(
      this.urlApi + '/obtenirDadesParticipacio?kparticipacio='+part.kparticipacio
    );
  }  

  refreshPartipacio(part : CpParticipacioDTO): Observable<CpResultatParticipacioDTO> {
    return this.http.get<CpResultatParticipacioDTO>(
      this.urlApi + '/afegirParticipacio?kconvocatoria='+part.kconvocatoria+'&codiempl='+part.codiempl+'&datareg='+part.dataRegistre
    );
  }

   deleteParticipacio(part: CpParticipacioDTO): Observable<CpParticipacioDTO[]> {
      return this.http.delete<CpParticipacioDTO[]>(
        this.urlApi +
          '/deleteParticipacio/' +
          part.kparticipacio
      );
    }
  

  actualitzarCursAportat(curs: CpCursAportatDTO): Observable<CpCursAportatDTO> {
    return this.http.put<CpCursAportatDTO>(
      this.urlApi + '/actualitzarCursAportat',
      curs
    );
  }  


  actualitzarTitolAportat(curs: CpTitolAportatDTO): Observable<CpTitolAportatDTO> {
    return this.http.put<CpTitolAportatDTO>(
      this.urlApi + '/actualitzarTitolAportat',
      curs
    );
  } 

  tancarValoracioFormacio(part: CpParticipacioDTO): Observable<CpParticipacioDTO> {
    return this.http.put<CpParticipacioDTO>(
      this.urlApi + '/tancarValoracioFormacio',
      part
    );
  }  

  tancarValoracioCompetencies(part: CpParticipacioDTO): Observable<CpParticipacioDTO> {
    return this.http.put<CpParticipacioDTO>(
      this.urlApi + '/tancarValoracioCompetencies',
      part
    );
  }  

  afageirAvaluacio(aval: CpAvaluacioDTO): Observable<CpResultatAvaluacioDTO> {
    return this.http.post<CpResultatAvaluacioDTO>(
      this.urlApi + '/afegirAvaluacio',
      aval
    );
  }  

  deleteAvaluacio(aval: CpAvaluacioDTO): Observable<CpResultatAvaluacioDTO> {
     return this.http.delete<CpResultatAvaluacioDTO>(
        this.urlApi +
          '/esborrarAvaluacio/' +
          aval.kavaluacio
      );
  }


}