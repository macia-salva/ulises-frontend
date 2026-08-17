import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { TipusService } from './tipus.service';
import { SituPueDTO } from '../model/situpue.dto';
import { SituPlazDTO } from '../model/situplaz.dto';
import { AdscPuesDTO } from '../model/adscpues.dto';
import { AdscPlazDTO } from '../model/adscplaz.dto';
import { EntitatDTO } from '../model/entitat.dto';
import { Centtra1DTO } from '../model/centtra1.dto';
import { Centtra2DTO } from '../model/centtra2.dto';
import { Centtra3DTO } from '../model/centtra3.dto';
import { Centtra4DTO } from '../model/centtra4.dto';
import { Centtra5DTO } from '../model/centtra5.dto';
import { TiposRptDTO } from '../model/tiposrpt.dto';
import { YPuesTrabVDTO } from '../model/ypuestrabv.dto';
import { RptService } from './rpt.service';
import { SituadminDTO } from '../model/situadmin.dto';
import { NaturelaDTO } from '../model/naturela.dto';
import { NatuplazaDTO } from '../model/natuplaza.dto';
import { YPlazaDTO } from '../model/yplaza.dto';
import { PlantillaService } from './plantilla.service';
import { GrupoDTO } from '../model/grupos.dto';

@Injectable({
    providedIn: 'root',
  })
  export class RRHHTipusStorageService {

    constructor(
        private tipusService: TipusService,
        private rpsService: RptService,
        private plantillaService: PlantillaService,
        private localStorageService: LocalStorageService
      ) {}    

    getSituPues(forceReload: boolean): Observable<SituPueDTO[]> {
        return new Observable((observer) => {
          let localobjs: SituPueDTO[] = this.localStorageService.get(
            'RRHHCalviaSituPues'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getSituPues().subscribe((objs: SituPueDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaSituPues', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }
    
      getGrupos(forceReload: boolean): Observable<GrupoDTO[]> {
        return new Observable((observer) => {
          let localobjs: GrupoDTO[] = this.localStorageService.get(
            'RRHHCalviaGrupos'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getGrupos().subscribe((objs: GrupoDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaGrupos', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }
    

      getSituPlaza(forceReload: boolean): Observable<SituPlazDTO[]> {
        return new Observable((observer) => {
          let localobjs: SituPlazDTO[] = this.localStorageService.get(
            'RRHHCalviaSituPlaz'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getSituPlaz().subscribe((objs: SituPlazDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaSituPlaz', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }

      getAdscPues(forceReload: boolean): Observable<AdscPuesDTO[]> {
        return new Observable((observer) => {
          let localobjs: AdscPuesDTO[] = this.localStorageService.get(
            'RRHHCalviaAdscPues'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getAdscPues().subscribe((objs: AdscPuesDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaAdscPues', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }

      getAdscPlaz(forceReload: boolean): Observable<AdscPlazDTO[]> {
        return new Observable((observer) => {
          let localobjs: AdscPlazDTO[] = this.localStorageService.get(
            'RRHHCalviaAdscPlaz'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getAdscPlaz().subscribe((objs: AdscPlazDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaAdscPlaz', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }

      getSituAdmins(forceReload: boolean): Observable<SituadminDTO[]> {
        return new Observable((observer) => {
          let localobjs: SituadminDTO[] = this.localStorageService.get(
            'RRHHCalviaSituadmins'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getSituAdmins().subscribe((objs: SituadminDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaSituadmins', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }


      getNaturelacions(forceReload: boolean): Observable<NaturelaDTO[]> {
        return new Observable((observer) => {
          let localobjs: NaturelaDTO[] = this.localStorageService.get(
            'RRHHCalviaNaturelacions'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getNaturelacions().subscribe((objs: NaturelaDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaNaturelacions', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }


      getNatuplazas(forceReload: boolean): Observable<NatuplazaDTO[]> {
        return new Observable((observer) => {
          let localobjs: NatuplazaDTO[] = this.localStorageService.get(
            'RRHHCalviaNatuplazas'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getNatuplazas().subscribe((objs: NatuplazaDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaNatuplazas', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }


      getEntitats(forceReload: boolean): Observable<EntitatDTO[]> {
        return new Observable((observer) => {
          let localobjs: EntitatDTO[] = this.localStorageService.get(
            'RRHHCalviaEntitats'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getEntitats().subscribe((objs: EntitatDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaEntitats', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }

      getCenttra1(forceReload: boolean): Observable<Centtra1DTO[]> {
        return new Observable((observer) => {
          let localobjs: Centtra1DTO[] = this.localStorageService.get(
            'RRHHCalviaCenttra1'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getCenttra1().subscribe((objs: Centtra1DTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaCenttra1', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }

      getCenttra2(forceReload: boolean): Observable<Centtra2DTO[]> {
        return new Observable((observer) => {
          let localobjs: Centtra2DTO[] = this.localStorageService.get(
            'RRHHCalviaCenttra2'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getCenttra2().subscribe((objs: Centtra2DTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaCenttra2', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      } 
      
      getCenttra3(forceReload: boolean): Observable<Centtra3DTO[]> {
        return new Observable((observer) => {
          let localobjs: Centtra3DTO[] = this.localStorageService.get(
            'RRHHCalviaCenttra3'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getCenttra3().subscribe((objs: Centtra3DTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaCenttra3', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }           

      getCenttra4(forceReload: boolean): Observable<Centtra4DTO[]> {
        return new Observable((observer) => {
          let localobjs: Centtra4DTO[] = this.localStorageService.get(
            'RRHHCalviaCenttra4'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getCenttra4().subscribe((objs: Centtra4DTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaCenttra4', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }    

      getCenttra5(forceReload: boolean): Observable<Centtra5DTO[]> {
        return new Observable((observer) => {
          let localobjs: Centtra5DTO[] = this.localStorageService.get(
            'RRHHCalviaCenttra5'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getCenttra5().subscribe((objs: Centtra5DTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaCenttra5', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      } 


      getTiposRpt(forceReload: boolean): Observable<TiposRptDTO[]> {
        return new Observable((observer) => {
          let localobjs: TiposRptDTO[] = this.localStorageService.get(
            'RRHHCalviaTiposRpt'
          );
          if (forceReload || !localobjs) {
            this.tipusService.getTipusRpt().subscribe((objs: TiposRptDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaTiposRpt', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }       

      getNomsLlocs(forceReload: boolean): Observable<YPuesTrabVDTO[]> {
        return new Observable((observer) => {
          let localobjs: YPuesTrabVDTO[] = this.localStorageService.get(
            'RRHHCalviaNomsLlocs'
          );
          if (forceReload || !localobjs) {
            this.rpsService.nomsLlocs().subscribe((objs: YPuesTrabVDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaNomsLlocs', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }
  
      getNomsPlaces(forceReload: boolean): Observable<YPlazaDTO[]> {
        return new Observable((observer) => {
          let localobjs: YPlazaDTO[] = this.localStorageService.get(
            'RRHHCalviaNomsPlaces'
          );
          if (forceReload || !localobjs) {
            this.plantillaService.nomsPlaces().subscribe((objs: YPlazaDTO[]) => {
              localobjs = objs;
              this.localStorageService.set('RRHHCalviaNomsPlaces', localobjs);
              observer.next(localobjs);
            }, (error)=>observer.error(error));
          } else {
            observer.next(localobjs);
          }
        });
      }
  
  
  
    }  