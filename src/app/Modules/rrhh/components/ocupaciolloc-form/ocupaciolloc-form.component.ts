import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EntitatDTO } from '../../model/entitat.dto';
import { Centtra1DTO } from '../../model/centtra1.dto';
import { Centtra2DTO } from '../../model/centtra2.dto';
import { Centtra3DTO } from '../../model/centtra3.dto';
import { Centtra4DTO } from '../../model/centtra4.dto';
import { Centtra5DTO } from '../../model/centtra5.dto';
import { RRHHTipusStorageService } from '../../services/tipus-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/Shared/services/message.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { YFasePuesVDTO } from '../../model/yfasepuesv.dto';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalDTO } from '../../model/personal.dto';
import { MenuPersonalService } from '../../services/menu-personal.service';
import { TiposRptDTO } from '../../model/tiposrpt.dto';
import { YPuesTrabVDTO } from '../../model/ypuestrabv.dto';
import { SituPueDTO } from '../../model/situpue.dto';
import { AdscPuesDTO } from '../../model/adscpues.dto';
import { RptService } from '../../services/rpt.service';
import { formatDate } from '@angular/common';
import { formatSqlDate } from 'src/app/Shared/utils/formatter';
import { RelPuePersDTO } from '../../model/relpuepers.dto';
import { GrupoDTO } from '../../model/grupos.dto';

@Component({
  selector: 'app-ocupaciolloc-form',
  templateUrl: './ocupaciolloc-form.component.html',
  styleUrls: ['./ocupaciolloc-form.component.scss'],
})
export class OcupaciollocFormComponent implements OnInit {
  personal: PersonalDTO;

  filtering: boolean;
  updating: boolean;

  tipusRptLlista: TiposRptDTO[];
  gruposLlista: GrupoDTO[];
  entitatsLlista: EntitatDTO[];
  centtra1Llista: Centtra1DTO[];
  centtra2Llista: Centtra2DTO[];
  centtra3Llista: Centtra3DTO[];
  centtra4Llista: Centtra4DTO[];
  centtra5Llista: Centtra5DTO[];
  orgFiltratLlista: Centtra5DTO[];
  situLlista: SituPueDTO[];
  adscLlista: AdscPuesDTO[];
  llocsLlista: YPuesTrabVDTO[];

  fcenttra1Llista: Centtra1DTO[];
  fcenttra2Llista: Centtra2DTO[];
  fcenttra3Llista: Centtra3DTO[];
  fcenttra4Llista: Centtra4DTO[];
  fcenttra5Llista: Centtra5DTO[];

  fllocsLlista: Observable<YPuesTrabVDTO[]>;

  yfasepuesv: YFasePuesVDTO;
  relpueper: RelPuePersDTO | null = null;

  ocLlocForm: FormGroup;
  entitat: FormControl;
  centtra1: FormControl;
  centtra2: FormControl;
  centtra3: FormControl;
  centtra4: FormControl;
  centtra5: FormControl;
  tipusRpt: FormControl;
  situPues: FormControl;
  adscPues: FormControl;
  grupo: FormControl;
  titular: FormControl;
  jornada: FormControl;
  desde: FormControl;
  fins: FormControl;
  //finsTitular: FormControl;
  lloc: FormControl;

  filter: FormControl;

  titulo: String;
  accio: string | null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tipusStorageService: RRHHTipusStorageService,
    private menuPersonalService: MenuPersonalService,
    private rptService: RptService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.accio = this.activatedRoute.snapshot.paramMap.get('accio');
    this.filtering = false;
    this.updating = false;

    this.titulo = 'Ocupació LLoc';
    if (this.accio === 'insert') this.titulo = 'Alta ' + this.titulo;
    if (this.accio === 'update') this.titulo = 'Modificació ' + this.titulo;
    if (this.accio === 'delete') this.titulo = 'Esborrat ' + this.titulo;

    this.personal = menuPersonalService.getPersonal();
    this.tipusRptLlista = [];
    this.gruposLlista = [];
    this.situLlista = [];
    this.adscLlista = [];
    this.entitatsLlista = [];
    this.centtra1Llista = [];
    this.centtra2Llista = [];
    this.centtra3Llista = [];
    this.centtra4Llista = [];
    this.centtra5Llista = [];
    this.orgFiltratLlista = [];
    this.fcenttra1Llista = [];
    this.fcenttra2Llista = [];
    this.fcenttra3Llista = [];
    this.fcenttra4Llista = [];
    this.fcenttra5Llista = [];
    this.llocsLlista = [];
    if (this.accio === 'insert') {
      this.yfasepuesv = new YFasePuesVDTO();
    } else {
      this.yfasepuesv = menuPersonalService.getYfasepuesv();
      this.relpueper = menuPersonalService.getRelPuePer();
    }
    this.filter = new FormControl();
    this.titular = new FormControl({
      value: this.yfasepuesv.estitula,
      disabled: this.accio === 'delete',
    });

    this.jornada = new FormControl(
      { value: this.yfasepuesv.porcdedi, disabled: this.accio === 'delete' },
      Validators.required
    );
    if (this.accio === 'insert') {
      this.entitat = new FormControl('', Validators.required);
      this.centtra1 = new FormControl('', Validators.required);
      this.centtra2 = new FormControl('', Validators.required);
      this.centtra3 = new FormControl('', Validators.required);
      this.centtra4 = new FormControl('', Validators.required);
      this.centtra5 = new FormControl('', Validators.required);
      this.tipusRpt = new FormControl('4', Validators.required);
      this.lloc = new FormControl('', Validators.required);
      this.grupo = new FormControl('', Validators.required);
    } else {
      this.entitat = new FormControl(this.yfasepuesv.id.codienti);
      this.centtra1 = new FormControl(this.yfasepuesv.ydotacionv.centtra1);
      this.centtra2 = new FormControl(this.yfasepuesv.ydotacionv.centtra2);
      this.centtra3 = new FormControl(this.yfasepuesv.ydotacionv.centtra3);
      this.centtra4 = new FormControl(this.yfasepuesv.ydotacionv.centtra4);
      this.centtra5 = new FormControl(this.yfasepuesv.ydotacionv.centtra5);
      this.tipusRpt = new FormControl(this.yfasepuesv.id.coditrpt);
      //      this.lloc = new FormControl(this.yfasepuesv.id.coditrpt);
      this.lloc = new FormControl();
      this.grupo = new FormControl(
        { value: this.yfasepuesv.codigrup, disabled: this.accio === 'delete' },
        Validators.required
      );
    }
    this.situPues = new FormControl(
      { value: this.yfasepuesv.codispue, disabled: this.accio === 'delete' },
      Validators.required
    );
    this.adscPues = new FormControl(
      { value: this.yfasepuesv.codiadpu, disabled: this.accio === 'delete' },
      Validators.required
    );

    let fdata = this.yfasepuesv.finivers
      ? formatSqlDate(this.yfasepuesv.finivers.toString())
      : '';
    this.desde = new FormControl(
      { value: fdata, disabled: this.accio === 'delete' || this.accio === 'update_current'},
      Validators.required
    );

    /*fdata = this.yfasepuesv.yfasepue.fexpcese
      ? formatSqlDate(this.yfasepuesv.yfasepue.fexpcese.toString())
      : '';
    this.finsTitular = new FormControl({
      value: fdata,
      disabled: this.accio === 'delete',
    });*/

    fdata = this.yfasepuesv.ffinvers
      ? formatSqlDate(this.yfasepuesv.ffinvers.toString())
      : '';
    if (this.accio === 'update_current') {
      this.fins = new FormControl(
        { value: fdata, disabled: true}
      );
    }
    else {
      this.fins = new FormControl(
        { value: fdata, disabled: this.accio === 'delete'},
        Validators.required
      );
    }

    this.ocLlocForm = this.formBuilder.group(
      {
        fechpose: this.desde,
        fechcese: this.fins,
        fexpcese: this.fins,
        porcdedi: this.jornada,
        codienti: this.entitat,
        coditrpt: this.tipusRpt,
        centtra1: this.centtra1,
        centtra2: this.centtra2,
        centtra3: this.centtra3,
        centtra4: this.centtra4,
        centtra5: this.centtra5,
        codispue: this.situPues,
        codiadpu: this.adscPues,
        codigrup: this.grupo,
        finivers: this.desde,
        ffinvers: this.fins,
        //finsTitular: this.finsTitular,
        titular: this.titular,
      },
      { validators: [this.checKDates] }
    );

    this.fllocsLlista = this.lloc.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterLlocs(value))
    );

    this.initSelects();
  }

  ngOnInit(): void {}

  private initSelects() {
    this.loadGrupos();
    this.loadTiposRpt();
    this.loadAdscPues();
    this.loadSituPues();
    this.loadEntitats();
    this.loadCenttra1();
    this.loadCenttra2();
    this.loadCenttra3();
    this.loadCenttra4();
    this.loadCenttra5();
    this.loadNomsLlocs();
  }

  private filterLlocs(value: string): YPuesTrabVDTO[] {
    const llocTmp: YPuesTrabVDTO[] = this.llocsLlista.filter(
      (lloc) =>
        lloc.id.codienti === this.entitat.value &&
        lloc.id.coditrpt === this.tipusRpt.value &&
        (lloc.descpues ? lloc.descpues : '')
          .toUpperCase()
          .includes((value ? value : '0').toUpperCase())
    );
    if (this.accio === 'insert' && llocTmp.length === 1) {
      this.grupo.setValue(llocTmp[0].codigrup);
    }
    return llocTmp;
  }

  private loadEntitats(): void {
    this.tipusStorageService.getEntitats(false).subscribe(
      (entitats: EntitatDTO[]) => {
        this.entitatsLlista = entitats;
        if (this.accio === 'insert') {
          this.yfasepuesv.id.codienti = Number(1);
          this.yfasepuesv.ydotacionv.id.codienti = Number(1);
          this.centtra1.setValue('');
          this.entitat.setValue(1);
        }
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadCenttra1(): void {
    this.tipusStorageService.getCenttra1(false).subscribe(
      (centtra: Centtra1DTO[]) => {
        this.centtra1Llista = centtra;
        if (this.accio === 'insert') {
          this.fcenttra1Llista = this.centtra1Llista.filter(
            (centtra1) => centtra1.id.codienti === 1
          );
          this.centtra1.setValue('HIS');
          this.yfasepuesv.ydotacionv.centtra1 = 'HIS';
        }
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadCenttra2(): void {
    this.tipusStorageService.getCenttra2(false).subscribe(
      (centtra: Centtra2DTO[]) => {
        this.centtra2Llista = centtra;
        if (this.accio === 'insert') {
          this.fcenttra2Llista = this.centtra2Llista.filter(
            (centtra2) =>
              centtra2.id.codienti === 1 && centtra2.id.centtra1 === 'HIS'
          );
          this.centtra2.setValue('');
        }
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadCenttra3(): void {
    this.tipusStorageService.getCenttra3(false).subscribe(
      (centtra: Centtra3DTO[]) => {
        this.centtra3Llista = centtra;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadCenttra4(): void {
    this.tipusStorageService.getCenttra4(false).subscribe(
      (centtra: Centtra4DTO[]) => {
        this.centtra4Llista = centtra;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadCenttra5(): void {
    this.tipusStorageService.getCenttra5(false).subscribe(
      (centtra: Centtra5DTO[]) => {
        this.centtra5Llista = centtra;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadTiposRpt(): void {
    this.tipusStorageService.getTiposRpt(false).subscribe(
      (tpRpt: TiposRptDTO[]) => {
        this.tipusRptLlista = tpRpt;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }
  private loadGrupos(): void {
    this.tipusStorageService.getGrupos(false).subscribe(
      (grps: GrupoDTO[]) => {
        this.gruposLlista = grps;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }
  private loadSituPues(): void {
    this.tipusStorageService.getSituPues(false).subscribe(
      (tipus: SituPueDTO[]) => {
        this.situLlista = tipus.filter((situ) =>
          situ.descspue.startsWith('OCU') || situ.codispue==='VR'
        );
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadAdscPues(): void {
    this.tipusStorageService.getAdscPues(false).subscribe(
      (tipus: AdscPuesDTO[]) => {
        this.adscLlista = tipus;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  private loadNomsLlocs(): void {
    this.tipusStorageService.getNomsLlocs(false).subscribe(
      (llocs: YPuesTrabVDTO[]) => {
        this.llocsLlista = llocs;
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('ocupacioLlocFeedback', error)
    );
  }

  changeEntitat(event: MatSelectChange) {
    let kentitat = event.value;
    this.yfasepuesv.id.codienti = Number(kentitat);
    this.yfasepuesv.ydotacionv.id.codienti = Number(kentitat);
    this.fcenttra1Llista = this.centtra1Llista.filter(
      (centtra1) => centtra1.id.codienti === this.yfasepuesv.id.codienti
    );
    this.filter.setValue('');
    this.centtra1.setValue('');
    this.fcenttra2Llista = [];
    this.fcenttra3Llista = [];
    this.fcenttra4Llista = [];
    this.fcenttra5Llista = [];
    this.lloc.setValue('');
  }

  changeTpRpt(event: MatSelectChange) {
    this.lloc.setValue('');
  }

  changeCenttra1(event: MatSelectChange) {
    let centtra1 = event.value;
    this.yfasepuesv.ydotacionv.centtra1 = centtra1;
    this.fcenttra2Llista = this.centtra2Llista.filter(
      (centtra2) =>
        centtra2.id.codienti === this.yfasepuesv.id.codienti &&
        centtra2.id.centtra1 == centtra1 &&
        (!this.filtering || this.orgFiltratLlista.find(
          c5 => centtra2.id.centtra1 === c5.id.centtra1 &&
          centtra2.id.centtra2 === c5.id.centtra2
          ))
    );
    this.centtra2.setValue('');
    this.fcenttra3Llista = [];
    this.fcenttra4Llista = [];
    this.fcenttra5Llista = [];
  }

  changeCenttra2(event: MatSelectChange) {
    let centtra2 = event.value;
    this.yfasepuesv.ydotacionv.centtra2 = centtra2;
    this.fcenttra3Llista = this.centtra3Llista.filter(
      (centtra3) =>
        centtra3.id.codienti === this.yfasepuesv.id.codienti &&
        centtra3.id.centtra1 == this.yfasepuesv.ydotacionv.centtra1 &&
        centtra3.id.centtra2 == centtra2 &&
        (!this.filtering || this.orgFiltratLlista.find(
          c5 => centtra3.id.centtra1 === c5.id.centtra1 &&
          centtra3.id.centtra2 === c5.id.centtra2 &&
          centtra3.id.centtra3 === c5.id.centtra3
          ))
    );
    this.centtra3.setValue('');
    this.fcenttra4Llista = [];
    this.fcenttra5Llista = [];
  }

  changeCenttra3(event: MatSelectChange) {
    let centtra3 = event.value;
    this.yfasepuesv.ydotacionv.centtra3 = centtra3;
    this.fcenttra4Llista = this.centtra4Llista.filter(
      (centtra4) =>
        centtra4.id.codienti === this.yfasepuesv.id.codienti &&
        centtra4.id.centtra1 == this.yfasepuesv.ydotacionv.centtra1 &&
        centtra4.id.centtra2 == this.yfasepuesv.ydotacionv.centtra2 &&
        centtra4.id.centtra3 == centtra3 &&
        (!this.filtering || this.orgFiltratLlista.find(
          c5 => centtra4.id.centtra1 === c5.id.centtra1 &&
          centtra4.id.centtra2 === c5.id.centtra2 &&
          centtra4.id.centtra3 === c5.id.centtra3 &&
          centtra4.id.centtra4 === c5.id.centtra4
          ))
    );
    this.centtra4.setValue('');
    this.fcenttra5Llista = [];
  }

  changeCenttra4(event: MatSelectChange) {
    let centtra4 = event.value;
    this.yfasepuesv.ydotacionv.centtra4 = centtra4;
    this.fcenttra5Llista = this.centtra5Llista.filter(
      (centtra5) =>
        centtra5.id.codienti === this.yfasepuesv.id.codienti &&
        centtra5.id.centtra1 == this.yfasepuesv.ydotacionv.centtra1 &&
        centtra5.id.centtra2 == this.yfasepuesv.ydotacionv.centtra2 &&
        centtra5.id.centtra3 == this.yfasepuesv.ydotacionv.centtra3 &&
        centtra5.id.centtra4 == centtra4 &&
        (!this.filtering || this.orgFiltratLlista.find(
          c5 => centtra5.id.centtra1 === c5.id.centtra1 &&
          centtra5.id.centtra2 === c5.id.centtra2 &&
          centtra5.id.centtra3 === c5.id.centtra3 &&
          centtra5.id.centtra4 === c5.id.centtra4 &&
          centtra5.id.centtra5 === c5.id.centtra5
          ))
    );
    this.centtra5.setValue('');
  }

  changeCenttra5(event: MatSelectChange) {
    let centtra5 = event.value;
    this.yfasepuesv.ydotacionv.centtra5 = centtra5;
  }

  public tornar(): void {
    this.router.navigateByUrl('rrhh/personal');
  }

  private buildLloc(): number {
    const lloc = this.llocsLlista.filter(
      (lloc) =>
        (lloc.descpues ? lloc.descpues : '').toUpperCase() ===
        this.lloc.value.toUpperCase()
    )[0];
    return lloc ? lloc.id.codipues : 0;
  }

  public saveOcupacioLloc() {
    if (this.ocLlocForm.invalid) {
      return;
    }
    this.updating = true;
    if (this.accio === 'insert') {
      this.yfasepuesv.id.codienti = this.entitat.value;
      this.yfasepuesv.id.codipues = this.buildLloc();
      this.yfasepuesv.id.coditrpt = this.tipusRpt.value;
      this.yfasepuesv.ydotacionv.centtra1 = this.centtra1.value;
      this.yfasepuesv.ydotacionv.centtra2 = this.centtra2.value;
      this.yfasepuesv.ydotacionv.centtra3 = this.centtra3.value;
      this.yfasepuesv.ydotacionv.centtra4 = this.centtra4.value;
      this.yfasepuesv.ydotacionv.centtra5 = this.centtra5.value;
    }
    this.yfasepuesv.yfasepue.fechpose = this.desde.value;
    this.yfasepuesv.yfasepue.fcrefase = this.desde.value;
    this.yfasepuesv.yfasepue.fechcese = this.fins.value;
    //this.yfasepuesv.yfasepue.fexpcese = this.finsTitular.value;
    this.yfasepuesv.yfasepue.porcdedi = this.jornada.value;
    this.yfasepuesv.codispue = this.situPues.value;
    this.yfasepuesv.codiadpu = this.adscPues.value;
    this.yfasepuesv.codigrup = this.grupo.value;
    this.yfasepuesv.estitula = this.titular.value;
    this.yfasepuesv.finivers = this.desde.value;
    this.yfasepuesv.ffinvers = this.fins.value;
    this.yfasepuesv.porcdedi = this.jornada.value;
    this.yfasepuesv.yfasepue.codiempl = this.personal.id.codiempl;

    if (this.accio === 'insert') {
      this.createLloc();
    }
    if (this.accio === 'update' || this.accio === 'update_current') {
      this.updateLloc();
    }
    if (this.accio === 'delete') {
      this.deleteLloc();
    }
  }

  private createLloc(): void {
    this.rptService.addYfsepuev(this.yfasepuesv).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('rrhh/personal');
      },
      (error: HttpErrorResponse) => {
        this.updating = false;
        this.messageService.showHttpResponseError(
          'ocupacioLlocFeedback',
          error
        );
      }
    );
  }

  private updateLloc(): void {
    this.rptService.updateYfsepuev(this.yfasepuesv).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('rrhh/personal');
      },
      (error: HttpErrorResponse) => {
        this.updating = false;
        this.messageService.showHttpResponseError(
          'ocupacioLlocFeedback',
          error
        );
      }
    );
  }

  private deleteLloc(): void {
    this.rptService.deleteYfsepuev(this.yfasepuesv).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('rrhh/personal');
      },
      (error: HttpErrorResponse) => {
        this.updating = false;
        this.messageService.showHttpResponseError(
          'ocupacioLlocFeedback',
          error
        );
      }
    );
  }

  private checKDates: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const desde = control.get('finivers');
    const fins = control.get('ffinvers');
    if (this.accio==='update_current' || desde?.value <= fins?.value) return null;
    else return { datesError: true };
  };

  public filterOrgaTmp() {
    let fvalue = this.filter.value.toUpperCase();
    this.centtra5Llista.forEach((c5: Centtra5DTO) => {
      let c4 = this.centtra4Llista.find(
        (c4) => c4.id.centtra4 === c5.id.centtra4
      );
      if (c4) {
        if (c4.desctra4.indexOf(fvalue)>=0) {
          console.log(c4);
        }
      }
    });

  }

  public filterOrga() {
    if (!this.filter.value || this.filter.value==='') return;
    let fvalue = this.filter.value.toUpperCase();
    this.filtering = true;
    this.orgFiltratLlista = [];
    this.centtra5Llista.forEach((c5: Centtra5DTO) => {
      if (c5.id.codienti === this.yfasepuesv.id.codienti) {
        let swConteFiltre = false;
        if (c5.desctra5.indexOf(fvalue) >= 0) {
          swConteFiltre = true;
        }
        else {
          let c4 = this.centtra4Llista.find(
            (c4) => c4.id.centtra4 === c5.id.centtra4 &&
            c4.id.centtra3 === c5.id.centtra3 && 
            c4.id.centtra2 === c5.id.centtra2 && 
            c4.id.centtra1 === c5.id.centtra1  
          );
          if (c4) {
            if (c4.desctra4.indexOf(fvalue) >= 0) {
              swConteFiltre = true;
            }
            else {
              let c3 = this.centtra3Llista.find(
                (c3) => c3.id.centtra3 === c5.id.centtra3 &&
                c3.id.centtra2 === c5.id.centtra2 && 
                c3.id.centtra1 === c5.id.centtra1  
    
              );
              if (c3) {
                if (c3.desctra3.indexOf(fvalue) >= 0) {
                  swConteFiltre = true;
                }
                else {
                  let c2 = this.centtra2Llista.find(
                    (c2) => c2.id.centtra2 === c5.id.centtra2 &&
                        c2.id.centtra1 === c5.id.centtra1  
        
                  );
                  if (c2) {
                    if (c2.desctra2.indexOf(fvalue) >= 0) {
                      swConteFiltre = true;
                    }
                    else {
                      let c1 = this.centtra1Llista.find(
                        (c1) => c1.id.centtra1 === c5.id.centtra1
                      );
                      if (c1) {
                        if (c1.desctra1.indexOf(fvalue) >= 0) {
                          swConteFiltre = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (swConteFiltre) {
          this.orgFiltratLlista.push(c5);
        }
    }
    });
    this.centtra1.setValue('');
    this.centtra2.setValue('');
    this.centtra3.setValue('');
    this.centtra4.setValue('');
    this.centtra5.setValue('');
    this.fcenttra1Llista = [];
    this.centtra1Llista.forEach(
      (centtra1) => {
        if (centtra1.id.codienti === this.yfasepuesv.id.codienti && this.orgFiltratLlista.find(c5 => centtra1.id.centtra1 === c5.id.centtra1)) {
          this.fcenttra1Llista.push(centtra1);
        }
      }
    );

  }

  public unfilter() {
    this.filtering = false;
    this.filter.setValue('');
    this.centtra1.setValue('');
    this.centtra2.setValue('');
    this.centtra3.setValue('');
    this.centtra4.setValue('');
    this.centtra5.setValue('');
    this.fcenttra1Llista = [];
    this.fcenttra1Llista = this.centtra1Llista.filter(
      (centtra1) => centtra1.id.codienti === this.yfasepuesv.id.codienti
    );
    this.fcenttra2Llista = [];
    this.fcenttra3Llista = [];
    this.fcenttra4Llista = [];
    this.fcenttra5Llista = [];
    this.lloc.setValue('');
}
}
