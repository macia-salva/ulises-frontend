import { Injectable } from "@angular/core";
import { CpConvocatoriaDTO } from "../model/cpconvocatoria.dto";
import { CpParticipacioDTO } from "../model/cpparticipacio.dto";

@Injectable({
  providedIn: 'root',
})

//http://developinginspanish.com/2018/05/19/3-formas-de-comunicarse-entre-componentes-angular/
export class MenuCarreraService {
    convocatoria: CpConvocatoriaDTO | null = null;
    participacio: CpParticipacioDTO | null = null;
    mode: string = '';
}