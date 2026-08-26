import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MessageService } from 'src/app/Shared/services/message.service';
import { PlantillaService } from '../../services/plantilla.service';
import { RptService } from '../../services/rpt.service';
import { MenuPersonalService } from '../../services/menu-personal.service';
import { PersonalDTO } from '../../model/personal.dto';
import { RelPuePersDTO } from '../../model/relpuepers.dto';
import { RelPlazPersDTO } from '../../model/relplazpers.dto';
import { Router } from '@angular/router';
import { SrvprevDTO } from '../../model/srvprev.dto';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  personal: PersonalDTO;
  llistaLlocs: RelPuePersDTO[];
  llistaPlaces: RelPlazPersDTO[];
  llistaSrvprest: SrvprevDTO[];
  isSearchingPlaces: boolean;
  isSearchingLlocs: boolean;
  isSearchingSrvPrest: boolean;

  dlimit: FormControl;

  llocsDisplayedColumns: string[] = [
    'entitat',
    'lloc',
    'titular',
    'grup',
    'situacio',
    'adscripcio',
    'efecte',
    'vigencia',
    'jornada',
    'desde',
    'fins',
    'update',
    'delete',
  ];

  plazaDisplayedColumns: string[] = [
    'plaza',
    'grup',
    'categoria',
    'situacio',
    'adscripcio',
    'relacio',
    'situadm',
    'desde',
    'fins',
    'update',
    'delete',
  ];

  spDisplayedColumns: string[] = [
    'admin',
    'plaza',
    'rela',
    'situAdm',
    'dedicacio',
    'desde',
    'fins',
    'delete',
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private menuPersonalService: MenuPersonalService,
    private rptservice: RptService,
    private _ngZone: NgZone,
    private rptService: RptService,
    private plantillaService: PlantillaService
  ) {
    this.personal = menuPersonalService.getPersonal();
    this.dlimit = new FormControl();
    this.isSearchingPlaces = false;
    this.isSearchingLlocs = false;
    this.isSearchingSrvPrest = false;
    this.llistaLlocs = [];
    this.llistaPlaces = [];
    this.llistaSrvprest = [];
    this.loadLlistes();
  }

  ngOnInit(): void { }

  private loadLlistes() {
    this.loadLlocs();
  }

  private loadLlocs() {
    this.isSearchingLlocs = true;
    this.rptService
      .relacioLlocsEmpl(
        this.personal.id.codienti.toString(),
        this.personal.id.codiempl.toString()
      )
      .subscribe(
        (llocs: RelPuePersDTO[]) => {
          this.llistaLlocs = llocs;
          this.isSearchingLlocs = false;
          this.loadPlaces();
        },
        (error: HttpErrorResponse) =>
          this.messageService.showHttpResponseError('rrhhFeedback', error)
      );
  }

  private loadPlaces() {
    this.isSearchingPlaces = true;
    this.plantillaService
      .relacioPlacesEmpl(
        this.personal.id.codienti.toString(),
        this.personal.id.codiempl.toString()
      )
      .subscribe(
        (places: RelPlazPersDTO[]) => {
          this.llistaPlaces = places;
          this.isSearchingPlaces = false;
          this.loadSevPrest();
        },
        (error: HttpErrorResponse) =>
          this.messageService.showHttpResponseError('rrhhFeedback', error)
      );
  }

  private loadSevPrest() {
    this.isSearchingSrvPrest = true;
    this.rptService
      .relacioServPrestats(this.personal.id.codiempl.toString())
      .subscribe(
        (sp: SrvprevDTO[]) => {
          this.llistaSrvprest = sp;
          this.isSearchingSrvPrest = false;
        },
        (error: HttpErrorResponse) =>
          this.messageService.showHttpResponseError('rrhhFeedback', error)
      );
  }

  public getJornada(pue: RelPuePersDTO): string {
    return pue.porcentajeJornadaFas
      ? pue.porcentajeJornadaFas.toString() + '%'
      : '100%';
  }

  public tornar(): void {
    this.router.navigateByUrl('rrhh/personal-list');
  }

  public afegirPlaza(): void {
    this.menuPersonalService.cleanYfaseplazv();
    this.router.navigateByUrl('rrhh/ocupacioplaza/insert');
  }

  public updatePlaza(plaza: RelPlazPersDTO): void {
    this.menuPersonalService.setYfaseplazv(plaza);
    this.router.navigateByUrl('rrhh/ocupacioplaza/update');
  }

  public deletePlaza(plaza: RelPlazPersDTO): void {
    this.menuPersonalService.setYfaseplazv(plaza);
    this.router.navigateByUrl('rrhh/ocupacioplaza/delete');
  }

  public afegirLloc(): void {
    this.menuPersonalService.cleanYfasepuesv();
    this.router.navigateByUrl('rrhh/ocupaciolloc/insert');
  }

  public updateLloc(lloc: RelPuePersDTO): void {
    this.menuPersonalService.setYfasepuesv(lloc);
    if (lloc.activoHoy !== 'S')
      this.router.navigateByUrl('rrhh/ocupaciolloc/update');
    else
      this.router.navigateByUrl('rrhh/ocupaciolloc/update_current');
  }

  public deleteLloc(lloc: RelPuePersDTO): void {
    this.menuPersonalService.setYfasepuesv(lloc);
    this.router.navigateByUrl('rrhh/ocupaciolloc/delete');
  }

  public deleteSrvprestat(sp: SrvprevDTO): void {
    let ok: boolean = confirm(
      'Està segur de voler esborrar el servei previ: ' + sp.descplaz
    );
    if (ok) {
      this.rptService.deletServPrestats(sp).subscribe(
        () => {
          this.loadSevPrest();
        },
        (error: HttpErrorResponse) => {
          this.messageService.showHttpResponseError('rrhhFeedback', error);
        }
      );
    }
  }

  /*
    public imprimir(): void { 
  //    let fdate:string = formatDate(Date.now(),'yyyyMMdd','es-ES');
      window.open('http://ulises.calvia.net/RestApi/servlet/ReportProxy?report=/reports/ginpix/puestos/ServPrestats.jasper&DATASOURCE=GINPIX&CODIENTI='+this.personal.id.codienti+'&CODIEMPL='+this.personal.id.codiempl,'_blank');
    }
  */

  public imprimir(esDocx: boolean = false): void {
    // let fdate:string = formatDate(Date.now(),'yyyyMMdd','es-ES');
    if (this.dlimit.value === '') {
      alert("La data límit es obligatoria");
    } else {
     // Si es docx añade &EXPORT=DOC, si no (PDF), no añade nada
      const exportParam = esDocx ? '&EXPORT=DOC' : '';

      window.open(
        'http://ulises.calvia.net/RestApi/servlet/ReportProxy?report=/reports/ginpix/puestos/ServPrestats.jasper&DATASOURCE=GINPIX&CODIENTI=' +
        this.personal.id.codienti +
        '&CODIEMPL=' +
        this.personal.id.codiempl +
        '&DLIMIT=' +
        this.dlimit.value +
        exportParam,
        '_blank'
      );
    }
  }


  public imprimir_qualif(): void {
    //    let fdate:string = formatDate(Date.now(),'yyyyMMdd','es-ES');
    window.open('http://ulises.calvia.net/RestApi/servlet/ReportProxy?report=/reports/ginpix/puestos/QualifProf.jasper&TYPE=odt&DATASOURCE=GINPIX&CODIENTI=' + this.personal.id.codienti + '&CODIEMPL=' + this.personal.id.codiempl, '_blank');
  }

  public obtenirDataInici(rpp: RelPuePersDTO): Date {
    let dataInici: Date;
    let dataFiDot: Date | null;
    if (rpp.finVersionDot == null) dataFiDot = new Date();
    else dataFiDot = this.getDate(rpp.finVersionDot);
    if (this.getDate(rpp.inicioVersionDot) <= this.getDate(rpp.inicioVersionFas) && (dataFiDot >= this.getDate(rpp.inicioVersionFas))) dataInici = rpp.inicioVersionFas;
    else dataInici = rpp.inicioVersionDot;
    return dataInici;
  }

  public obtenirDataFi(rpp: RelPuePersDTO): Date {
    let dataFi: Date | null;
    let dataFiDot: Date | null;
    if (rpp.finVersionDot == null) dataFiDot = new Date();
    else dataFiDot = this.getDate(rpp.finVersionDot);
    let dataFiFase: Date | null;
    if (rpp.finVersionFas == null) dataFiFase = new Date();
    else dataFiFase = this.getDate(rpp.finVersionFas);
    if (this.getDate(rpp.inicioVersionDot) <= dataFiFase && dataFiDot >= dataFiFase) dataFi = rpp.finVersionFas;
    else dataFi = rpp.finVersionDot;
    return dataFi;
  }

  private getDate(data: Date): Date {
    let [day, month, year] = data.toString().split('/');
    return new Date(+year, +month - 1, +day);
  }


}
