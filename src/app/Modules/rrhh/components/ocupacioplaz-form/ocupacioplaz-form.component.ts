import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PersonalDTO } from '../../model/personal.dto';
import { NatuplazaDTO } from '../../model/natuplaza.dto';
import { SituPlazDTO } from '../../model/situplaz.dto';
import { NaturelaDTO } from '../../model/naturela.dto';
import { AdscPlazDTO } from '../../model/adscplaz.dto';
import { SituadminDTO } from '../../model/situadmin.dto';
import { YFasePlazVDTO } from '../../model/yfaseplazv.dto';
import { RelPlazPersDTO } from '../../model/relplazpers.dto';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RRHHTipusStorageService } from '../../services/tipus-storage.service';
import { MenuPersonalService } from '../../services/menu-personal.service';
import { PlantillaService } from '../../services/plantilla.service';
import { MessageService } from 'src/app/Shared/services/message.service';
import { formatSqlDate } from 'src/app/Shared/utils/formatter';
import { YPlazaDTO } from '../../model/yplaza.dto';
import { EntitatDTO } from '../../model/entitat.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ocupacioplaz-form',
  templateUrl: './ocupacioplaz-form.component.html',
  styleUrls: ['./ocupacioplaz-form.component.scss'],
})
export class OcupacioplazFormComponent implements OnInit {
  personal: PersonalDTO;
  entitatsLlista: EntitatDTO[];
  natPlaLlista: NatuplazaDTO[];
  situPlaLlista: SituPlazDTO[];
  natRelLlista: NaturelaDTO[];
  tpAdsLLista: AdscPlazDTO[];
  situAdminLlista: SituadminDTO[];
  placesLlista: YPlazaDTO[];

  fPlacesLlista: Observable<YPlazaDTO[]>;

  yfaseplazv: YFasePlazVDTO;
  relplazpers: RelPlazPersDTO | null = null;
  ocPlazaForm: FormGroup;
  entitat: FormControl;
  natPlaza: FormControl;
  situPlaza: FormControl;
  natRela: FormControl;
  adscPlaza: FormControl;
  situAdmin: FormControl;
  jornada: FormControl;
  desde: FormControl;
  fins: FormControl;
//  finsTitular: FormControl;
  tplaza: FormControl;

  titulo: String;
  accio: string | null;

  updating: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tipusStorageService: RRHHTipusStorageService,
    private menuPersonalService: MenuPersonalService,
    private plantillaService: PlantillaService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.accio = this.activatedRoute.snapshot.paramMap.get('accio');
    this.updating = false;

    this.titulo = 'Ocupació Plaça';
    if (this.accio === 'insert') this.titulo = 'Alta ' + this.titulo;
    if (this.accio === 'update') this.titulo = 'Modificació ' + this.titulo;
    if (this.accio === 'delete') this.titulo = 'Esborrat ' + this.titulo;

    this.personal = menuPersonalService.getPersonal();

    this.entitatsLlista = [];
    this.natPlaLlista = [];
    this.situPlaLlista = [];
    this.natRelLlista = [];
    this.tpAdsLLista = [];
    this.situAdminLlista = [];
    this.placesLlista = [];


    if (this.accio === 'insert') {
      this.yfaseplazv = new YFasePlazVDTO();
    } else {
      this.yfaseplazv = menuPersonalService.getYfaseplazv();
      this.relplazpers = menuPersonalService.getRelPlazPer();
    }

    this.jornada = new FormControl(
      { value: this.yfaseplazv.porcdedi, disabled: this.accio === 'delete' },
      Validators.required
    );
    if (this.accio === 'insert') {
      this.entitat = new FormControl('', Validators.required);
      this.natPlaza = new FormControl('', Validators.required);
      this.tplaza = new FormControl('', Validators.required);
    } else {
      this.entitat = new FormControl(this.yfaseplazv.id.codienti);
      this.natPlaza = new FormControl(
        this.yfaseplazv.id.natuplaz,
        Validators.required
      );
      this.tplaza = new FormControl(this.yfaseplazv.id.coditpla);
    }

    this.situPlaza = new FormControl({value:this.yfaseplazv.codisper, disabled:this.accio==='delete'}, Validators.required);
    this.natRela = new FormControl({value:this.yfaseplazv.yfaseplaz.codirela, disabled:this.accio==='delete'}, Validators.required);
    this.situAdmin = new FormControl({value:this.yfaseplazv.codisiad, disabled:this.accio==='delete'});
    this.adscPlaza = new FormControl({value:this.yfaseplazv.codifoad, disabled:this.accio==='delete'}, Validators.required);

    let fdata=this.yfaseplazv.finivers?formatSqlDate(this.yfaseplazv.finivers.toString()):'';
    this.desde = new FormControl({value:fdata, disabled:this.accio==='delete'}, Validators.required);

    /*fdata=this.yfaseplazv.yfaseplaz.fexpmfin?formatSqlDate(this.yfaseplazv.yfaseplaz.fexpmfin.toString()):'';
    this.finsTitular = new FormControl({value:fdata, disabled:this.accio==='delete'});*/

    fdata=this.yfaseplazv.ffinvers?formatSqlDate(this.yfaseplazv.ffinvers.toString()):'';
    this.fins = new FormControl({value:fdata, disabled:this.accio==='delete'});

    this.ocPlazaForm = this.formBuilder.group({
      fechpose: this.desde,
      fechcese: this.fins,
      fexpcese: this.fins,
      porcdedi: this.jornada,
      codienti: this.entitat,
      natPlaza: this.natPlaza,
      situPlaza: this.situPlaza,
      adscPlaza: this.adscPlaza,
      situAdmin: this.situAdmin,
      jornada: this.jornada,
      tplaza: this.tplaza,    
      finivers: this.desde,
      ffinvers: this.fins,
      //finsTitular: this.finsTitular
    },
    { validators: [this.checKDates] }
    );

    this.fPlacesLlista = this.tplaza.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterPlaces(value))
    );
    this.initSelects();
  }

  private filterPlaces(value: string): YPlazaDTO[] {
    const plzTmp: YPlazaDTO[] = this.placesLlista.filter((plaza) =>
    plaza.id.codienti===this.entitat.value && plaza.id.natuplaz===this.natPlaza.value && (plaza.desctpla ? plaza.desctpla : '')
        .toUpperCase()
        .includes((value ? value : '0').toUpperCase())
    );
    return plzTmp;
  }  

  ngOnInit(): void {}


  private initSelects() {
    this.loadEntitats();
    this.loadNatPlaces();
    this.loadSituPlaces();
    this.loadNatRels();
    this.loadTpAdsc();
    this.loadSituAdmin();
    this.loadPlaces();
  }  

  private loadEntitats(): void {
    this.tipusStorageService.getEntitats(false).subscribe(
      (entitats: EntitatDTO[]) => {
        this.entitatsLlista = entitats;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioPlazaFeedback', error)
    );
  }


  private loadNatPlaces(): void {
    this.tipusStorageService.getNatuplazas(false).subscribe(
      (objs: NatuplazaDTO[]) => {
        this.natPlaLlista = objs;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioPlazaFeedback', error)
    );
  }  

  private loadNatRels(): void { 
    this.tipusStorageService.getNaturelacions(false).subscribe(
      (objs: NaturelaDTO[]) => {
        this.natRelLlista = objs;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioPlazaFeedback', error)
    );
  }  

  private loadSituPlaces(): void {
    this.tipusStorageService.getSituPlaza(false).subscribe(
      (objs: SituPlazDTO[]) => {
        this.situPlaLlista = objs;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioPlazaFeedback', error)
    );
  } 

  private loadTpAdsc(): void {
    this.tipusStorageService.getAdscPlaz(false).subscribe(
      (objs: AdscPlazDTO[]) => {
        this.tpAdsLLista = objs;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioPlazaFeedback', error)
    );
  } 

  private loadSituAdmin(): void {
    this.tipusStorageService.getSituAdmins(false).subscribe(
      (objs: SituadminDTO[]) => {
        this.situAdminLlista = objs;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioPlazaFeedback', error)
    );
  } 

  private loadPlaces(): void {
    this.tipusStorageService.getNomsPlaces(false).subscribe(
      (objs: YPlazaDTO[]) => {
        this.placesLlista = objs;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioPlazaFeedback', error)
    );
  } 

  private buildPlaz(): number {
    const plaz = this.placesLlista.filter(
      (plaz) =>
        (plaz.id.natuplaz===this.natPlaza.value && plaz.desctpla ? plaz.desctpla : '').toUpperCase() ===
        this.tplaza.value.toUpperCase()
    )[0];
    return plaz ? plaz.id.coditpla : 0;
  }

  public saveOcupacioPlaz() {
    if (this.ocPlazaForm.invalid) {
      return;
    } 
    this.updating = true;   
    if (this.accio==='insert')  {
      this.yfaseplazv.id.codienti=this.entitat.value;
      this.yfaseplazv.id.coditpla=this.buildPlaz();
      this.yfaseplazv.id.natuplaz=this.natPlaza.value;
    }
    this.yfaseplazv.yfaseplaz.fechpose=this.desde.value;
    this.yfaseplazv.yfaseplaz.fcrefase=this.desde.value;
    this.yfaseplazv.yfaseplaz.fechcese=this.fins.value;
    //this.yfaseplazv.yfaseplaz.fexpmfin=this.finsTitular.value;
    this.yfaseplazv.porcdedi=this.jornada.value;
    this.yfaseplazv.codisper=this.situPlaza.value;
    this.yfaseplazv.codifoad=this.adscPlaza.value;
    this.yfaseplazv.codisiad=this.situAdmin.value;
    this.yfaseplazv.finivers=this.desde.value;
    this.yfaseplazv.ffinvers=this.fins.value;
    this.yfaseplazv.yfaseplaz.codiempl=this.personal.id.codiempl;
    this.yfaseplazv.yfaseplaz.codirela=this.natRela.value;

    if (this.accio==='insert') {
      this.createPlaz();
    }
    if (this.accio==='update') {
      this.updatePlaz();
    }
    if (this.accio==='delete') {
      this.deletePlaz();
    }
  }  

  private createPlaz(): void {
    this.plantillaService.addYfaseplazv(this.yfaseplazv).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('rrhh/personal');
      },
      (error: HttpErrorResponse) => {
        this.updating = false;
        this.messageService.showHttpResponseError(
          'ocupacioPlazaFeedback',
          error
        );
      }
    );
  }

  private updatePlaz(): void {
    this.plantillaService.updateYfaseplazv(this.yfaseplazv).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('rrhh/personal');
      },
      (error: HttpErrorResponse) => {
        this.updating = false;
        this.messageService.showHttpResponseError(
          'ocupacioPlazaFeedback',
          error
        );
      }
    );
  }

  private deletePlaz(): void {
    this.plantillaService.deleteYfaseplazv(this.yfaseplazv).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('rrhh/personal');
      },
      (error: HttpErrorResponse) => {
        this.updating = false;
        this.messageService.showHttpResponseError(
          'ocupacioPlazaFeedback',
          error
        );
      }
    );
  }

  public tornar(): void {
    this.router.navigateByUrl('rrhh/personal');
  }

  private checKDates: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const desde = control.get('finivers');
    const fins = control.get('ffinvers');
    if (fins?.value==='' || desde?.value <= fins?.value) return null;
    else return { datesError: true };
  };    
}
