import { Component, OnInit } from '@angular/core';
import { CpResultatParticipacioDTO } from '../../model/cpresultatparticipacio.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService } from '../../services/carrera.service';
import { MenuCarreraService } from '../../services/menu-carrera.service';
import { MessageService } from 'src/app/Shared/services/message.service';
import { CpParticipacioDTO } from '../../model/cpparticipacio.dto';
import { CpConvocatoriaDTO } from '../../model/cpconvocatoria.dto';
import { CpCursAportatDTO } from '../../model/cpcursaportat.dto';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CpTitolAportatDTO } from '../../model/cptitolaportat.dto';
import { CpResultatAvaluacioDTO } from '../../model/cpresultatavaluacio.dto';
import { CpAvaluacioDTO } from '../../model/cpavaluacio.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-participacio',
  templateUrl: './participacio.component.html',
  styleUrls: ['./participacio.component.scss']
})
export class ParticipacioComponent implements OnInit {
  cpresultat: CpResultatParticipacioDTO[];
  resultatavaluacio: CpResultatAvaluacioDTO | null;
  avaluacions: CpAvaluacioDTO[];
  convocatoria: CpConvocatoriaDTO | null;
  participacio: CpParticipacioDTO | null;
  accio: string | null;
  mode: number;
  totalpunts: number;
  reading: boolean;

  formCompetencies: FormGroup;
  equip: FormControl;
  adaptabilitat: FormControl;
  compromis: FormControl;
  resultats: FormControl;
  ciutadania: FormControl;
  dirhabilitats: FormControl;
  dirform: FormControl;
  dirproced: FormControl;
  direadmin: FormControl;
  origen: FormControl;
  observacions: FormControl;




  displayedColumns: string[] = [
    'desde',
    'fins',
    'lloc',
    'grup',
    'dies',
    'coef',
    'diesp',
    'acum',
  ];


  cursosdisplayedColumns: string[] = [
    'descripcio',
    'data',
    'hores',
    'punts',
    'seleccio',
  ];  

  cursosantdisplayedColumns: string[] = [
    'descripcio',
    'data',
    'hores',
    'punts',
    'conv'
  ];  

  titolsdisplayedColumns: string[] = [
    'descripcio',
    'punts',
    'seleccio',
  ]; 

  titolsantdisplayedColumns: string[] = [
    'descripcio',
    'punts',
    'conv'
  ]; 

  valoraciodisplayedColumns: string[] = [
  ];  

  constructor(
    private router: Router,
    private carreraService: CarreraService,
    private menuCarreraService: MenuCarreraService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) {
    this.reading=true; 
    this.accio = this.activatedRoute.snapshot.paramMap.get('accio');
    this.participacio = menuCarreraService.participacio;
    if (this.participacio?.questionari==='1') {
      this.valoraciodisplayedColumns=[
        'origen',
        'equip',
        'adaptabilitat',
        'compromis',
        'resultats',
        'ciutadania',
        'dirhabilitats',
        'dirform',
        'dirproced',
        'direadmin',
        'observacions',
        'seleccio'
      ];
    }
    else {
      this.valoraciodisplayedColumns=[
        'origen',
        'equip',
        'adaptabilitat',
        'compromis',
        'resultats',
        'ciutadania',
        'observacions',
        'seleccio'
      ];
    }
    this.convocatoria = menuCarreraService.convocatoria;
    this.resultatavaluacio =null;
    this.cpresultat=[];
    this.avaluacions=[];
    this.mode=1;
    this.totalpunts=0;
    this.adaptabilitat=new FormControl('');
    this.ciutadania=new FormControl('');
    this.compromis=new FormControl('');
    this.equip=new FormControl('');
    this.resultats=new FormControl('');
    this.direadmin=new FormControl('');
    this.dirform=new FormControl('');
    this.dirhabilitats=new FormControl('');
    this.dirproced=new FormControl('');
    this.origen=new FormControl('',Validators.required);
    this.observacions=new FormControl('');

    this.formCompetencies= this.formBuilder.group(
      {
        adaptabilitat: this.adaptabilitat,
        ciutadania: this.ciutadania,
        compromis: this.compromis,
        equip: this.equip,
        resultats: this.resultats,
        direadmin: this.direadmin,
        dirform: this.dirform,
        dirhabilitats: this.dirhabilitats,
        dirproced: this.dirproced,
        origen: this.origen,
        observacions: this.observacions,
        kparticipacio: this.participacio?.kparticipacio
      },
    );

    
  }

  ngOnInit(): void {
    this.obtenirParticipacio();
  }

  processarResultatAvaluacio(resultatavaluacio: CpResultatAvaluacioDTO): void {
          this.resultatavaluacio=resultatavaluacio;
          this.avaluacions=this.resultatavaluacio.avaluacions;
          let avalcalc: CpAvaluacioDTO = {
            adaptabilitat: this.resultatavaluacio.adaptabilitat,
            ciutadania: this.resultatavaluacio.ciutadania,
            compromis: this.resultatavaluacio.compromis,
            direadmin: this.resultatavaluacio.direadmin,
            dirform: this.resultatavaluacio.dirform,
            dirhabilitats: this.resultatavaluacio.dirhabilitats,
            dirproced: this.resultatavaluacio.dirproced,
            equip: this.resultatavaluacio.equip,
            kavaluacio: 0,
            kparticipacio: 0,
            origen: 'M',
            resultats: this.resultatavaluacio.resultats,
            observacions: ''
          }
          this.avaluacions.push(avalcalc);

  }

  obtenirParticipacio(): void {
    if (this.participacio != null) {
      this.carreraService.obtenirPartipacio(this.participacio).subscribe(
        (result: CpResultatParticipacioDTO) => {
          this.cpresultat.push(result);
          this.processarResultatAvaluacio(result.resultatavaluacio);
          this.cpresultat[0].cursos.forEach(curs => {
            if (curs.swseleccionat==='S')
              this.totalpunts+=curs.punts;
          });
          this.cpresultat[0].titols.forEach(titol => {
            if (titol.swseleccionat==='S')
              this.totalpunts+=titol.punts;
          });
          this.reading=false;
        },
        (error) => {
          this.reading=false;
          this.messageService.showHttpResponseError(
            'Feedback',
            error
          );
        }
      );
    }
  }

  getStrOrigen(origen: string): string {
    let descr='';
    if (origen==='S') descr='Superior';
    if (origen==='C') descr='Col·laborador';
    if (origen==='M') descr='Mitja';
    return descr;
  }

  tornar() {
    this.router.navigateByUrl('carrera/participacio-list');
  }

  changeMode(mode: number):void {
    this.mode=mode;
  }

  tractarPunts(event: MatSlideToggleChange, curs:CpCursAportatDTO) {
    if (event.checked) {
      curs.swseleccionat='S';
      this.actualitarCurs(curs);
    }
    else {
      curs.swseleccionat='N';
      this.actualitarCurs(curs);
    }
  }

  tractarPuntsTitols(event: MatSlideToggleChange, curs:CpTitolAportatDTO) {
    if (event.checked) {
      curs.swseleccionat='S';
      this.actualitarTitol(curs);
    }
    else {
      curs.swseleccionat='N';
      this.actualitarTitol(curs);
    }
  }


  actualitarCurs(curs: CpCursAportatDTO): void {
      this.carreraService.actualitzarCursAportat(curs).subscribe(
        (result: CpCursAportatDTO) => {
          if (curs.swseleccionat==='S') {
            this.totalpunts+=curs.punts;
            if (this.totalpunts>=this.cpresultat[0].puntsRequrits) {
              alert('Valoració de cursos completada amb èxit');
            }
          }
          else {
            this.totalpunts-=curs.punts;
          }
        },
        (error) => {
          this.messageService.showHttpResponseError(
            'Feedback',
            error
          );
        }
      );     
  }


  actualitarTitol(curs: CpTitolAportatDTO): void {
      this.carreraService.actualitzarTitolAportat(curs).subscribe(
        (result: CpTitolAportatDTO) => {
          if (curs.swseleccionat==='S') {
            this.totalpunts+=curs.punts;
            if (this.totalpunts>=this.cpresultat[0].puntsRequrits) {
              alert('Valoració de cursos completada amb èxit');
            }
          }
          else {
            this.totalpunts-=curs.punts;
          }
        },
        (error) => {
          this.messageService.showHttpResponseError(
            'Feedback',
            error
          );
        }
      );     
  }  

  tancarValoracioFormacio(): void {
      this.carreraService.tancarValoracioFormacio(this.cpresultat[0].participacio).subscribe(
        (result: CpParticipacioDTO) => {
          this.participacio=result;
          this.cpresultat[0].participacio=result;
        },
        (error) => {
          this.messageService.showHttpResponseError(
            'Feedback',
            error
          );
        }
      );
      
  }

  tancarValoracioCompetencies(): void {
      this.carreraService.tancarValoracioCompetencies(this.cpresultat[0].participacio).subscribe(
        (result: CpParticipacioDTO) => {
          this.participacio=result;
          this.cpresultat[0].participacio=result;
        },
        (error) => {
          this.messageService.showHttpResponseError(
            'Feedback',
            error
          );
        }
      );      
  }

  positiu(valor: number | null | undefined): string {
    return !valor?'':valor>=0?valor.toString():(valor*-1).toString();
  }

  deleteAvaluacio(avaluacio: CpAvaluacioDTO) {
        this.carreraService.deleteAvaluacio(avaluacio).subscribe(
        (result: CpResultatAvaluacioDTO) => {
          this.processarResultatAvaluacio(result);
        },
        (error) => {
          this.messageService.showHttpResponseError(
            'Feedback',
            error
          );
        }
      );          
}

  saveCompetencies() {
    let kpart=this.participacio?this.participacio.kparticipacio:0;
    if (this.formCompetencies.valid) {
        let tmpparticipacio: CpAvaluacioDTO ={
        adaptabilitat: this.adaptabilitat.value===''?null:this.adaptabilitat.value,
        ciutadania: this.ciutadania.value===''?null:this.ciutadania.value,
        compromis: this.compromis.value===''?null:this.compromis.value,
        equip: this.equip.value===''?null:this.equip.value,
        resultats: this.resultats.value===''?null:this.resultats.value,
        direadmin: this.direadmin.value===''?null:this.direadmin.value,
        dirform: this.dirform.value===''?null:this.dirform.value,
        dirhabilitats: this.dirhabilitats.value===''?null:this.dirhabilitats.value,
        dirproced: this.dirproced.value===''?null:this.dirproced.value,
        origen: this.origen.value,
        observacions: this.observacions.value,
        kavaluacio: 0,
        kparticipacio: kpart
      }
      this.carreraService.afageirAvaluacio(tmpparticipacio).subscribe(
        (result: CpResultatAvaluacioDTO) => {
          this.processarResultatAvaluacio(result);
          this.adaptabilitat.setValue('');
          this.ciutadania.setValue('');
          this.compromis.setValue('');
          this.equip.setValue('');
          this.resultats.setValue('');
          this.direadmin.setValue('');
          this.dirform.setValue('');
          this.dirhabilitats.setValue('');
          this.dirproced.setValue('');
          this.observacions.setValue('');
        },
        (error) => {
          this.messageService.showHttpResponseError(
            'Feedback',
            error
          );
        }
      );          
    }
  }


    public imprimir(): void { 
//    let fdate:string = formatDate(Date.now(),'yyyyMMdd','es-ES');
    window.open(encodeURI('http://ulises.calvia.net/RestApi/servlet/ReportProxy?report=/reports/ginpix/carrera/informe.jasper&DATASOURCE=CALVIA&KPARTICIPACIO='+this.participacio?.kparticipacio),'_blank');
  }

}
