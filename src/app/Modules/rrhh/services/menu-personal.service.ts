import { EventEmitter, Injectable, Output } from '@angular/core';
import { PersonalDTO } from '../model/personal.dto';
import { YFasePuesVDTO } from '../model/yfasepuesv.dto';
import { RelPuePersDTO } from '../model/relpuepers.dto';
import { YFasePlazVDTO } from '../model/yfaseplazv.dto';
import { RelPlazPersDTO } from '../model/relplazpers.dto';

@Injectable({
  providedIn: 'root',
})

//http://developinginspanish.com/2018/05/19/3-formas-de-comunicarse-entre-componentes-angular/
export class MenuPersonalService {

  personal: PersonalDTO;
  yfasepuesv: YFasePuesVDTO;
  relpueper: RelPuePersDTO | null;
  yfaseplazv: YFasePlazVDTO;
  relplazper: RelPlazPersDTO | null;


  constructor() {
    this.personal= new PersonalDTO();
    this.yfasepuesv=new YFasePuesVDTO();
    this.yfaseplazv= new YFasePlazVDTO();
    this.relpueper=null; 
    this.relplazper=null;
  }

  getPersonal(): PersonalDTO {
/*    let str_acta:string | null = localStorage.getItem('PersonalRRHHCalvia');
    if (str_acta) return JSON.parse(str_acta);
    else return new PersonalDTO();*/
    return this.personal;

  }

  getRelPuePer(): RelPuePersDTO | null {
    return this.relpueper;
  }

  getRelPlazPer(): RelPlazPersDTO | null {
    return this.relplazper;
  }

  setPersonal(pers: PersonalDTO): void {
//    localStorage.setItem('PersonalRRHHCalvia',JSON.stringify(pers));
      this.personal=pers;
  }

  removePersonal(): void {
    this.personal= new PersonalDTO();
  }

  setYfasepuesv(relpueper: RelPuePersDTO) {
    this.relpueper=relpueper;
    this.yfasepuesv=new YFasePuesVDTO();
    this.yfasepuesv.id.codienti=relpueper.id.entidadCod;
    this.yfasepuesv.id.codipues=relpueper.id.puestoCod;
    this.yfasepuesv.id.coditrpt=relpueper.id.rptCod;
    this.yfasepuesv.id.numedota=relpueper.id.dotacionNum;
    this.yfasepuesv.id.numefase=relpueper.id.faseNumero;
    this.yfasepuesv.id.versfase=relpueper.id.versionFasePuesto;
    this.yfasepuesv.codispue=relpueper.situacionCod;
    this.yfasepuesv.codiadpu=relpueper.adscripcionCod;
    this.yfasepuesv.finivers=relpueper.inicioVersionFas;
    this.yfasepuesv.ffinvers=relpueper.finVersionFas;
    this.yfasepuesv.ydotacionv.centtra1=relpueper.organizacionNivel1Cod;
    this.yfasepuesv.ydotacionv.centtra2=relpueper.organizacionNivel2Cod;
    this.yfasepuesv.ydotacionv.centtra3=relpueper.organizacionNivel3Cod;
    this.yfasepuesv.ydotacionv.centtra4=relpueper.organizacionNivel4Cod;
    this.yfasepuesv.ydotacionv.centtra5=relpueper.organizacionNivel5Cod;
    this.yfasepuesv.estitula=relpueper.titular;
    this.yfasepuesv.porcdedi=relpueper.porcentajeJornadaFas;
    this.yfasepuesv.yfasepue.codiempl=relpueper.empleadoCod;
    //this.yfasepuesv.yfasepue.fexpcese=relpueper.expedienteCeseFecha;
    this.yfasepuesv.codigrup=relpueper.grupoRptocupacionCod;
  }

  setYfaseplazv(relplazper: RelPlazPersDTO) {
    this.relplazper=relplazper;
    this.yfaseplazv=new YFasePlazVDTO();
    this.yfaseplazv.id.codienti=relplazper.id.entidadCod;
    this.yfaseplazv.id.natuplaz=relplazper.id.naturalezaPzaCod;
    this.yfaseplazv.id.coditpla=relplazper.id.tipoPza;
    this.yfaseplazv.id.codiplaz=relplazper.id.numPlaza;
    this.yfaseplazv.id.numefase=relplazper.id.faseNumero;
    this.yfaseplazv.id.versfase=relplazper.id.versionFasePlaza;
    this.yfaseplazv.codisiad=relplazper.situacionAdminCod;
    this.yfaseplazv.codifoad=relplazper.adscripcionPzaCod;
    this.yfaseplazv.codisper=relplazper.situacionPzaCod;
    this.yfaseplazv.finivers=relplazper.inicioVersionFase;
    this.yfaseplazv.ffinvers=relplazper.finVersionFase;
    this.yfaseplazv.porcdedi=relplazper.porcentajeJorn;
    this.yfaseplazv.yfaseplaz.codiempl=relplazper.empleadoCod;
    //this.yfaseplazv.yfaseplaz.fexpmfin=relplazper.expeFinFechaPza;
    this.yfaseplazv.yfaseplaz.codirela=relplazper.naturalezaRelacionCod;
  }


  cleanYfasepuesv() {
    this.relpueper=null;
    this.yfasepuesv=new YFasePuesVDTO();
  }

  cleanYfaseplazv() {
    this.relplazper=null;
    this.yfaseplazv=new YFasePlazVDTO();
  }

  getYfasepuesv(): YFasePuesVDTO {
    return this.yfasepuesv;
  }

  getYfaseplazv(): YFasePlazVDTO {
    return this.yfaseplazv;
  }

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() validated: EventEmitter<boolean> = new EventEmitter();
}

