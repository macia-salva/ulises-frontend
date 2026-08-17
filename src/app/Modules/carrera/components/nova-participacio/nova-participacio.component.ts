import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CpConvocatoriaDTO } from '../../model/cpconvocatoria.dto';
import { CarreraService } from '../../services/carrera.service';
import { MenuCarreraService } from '../../services/menu-carrera.service';
import { MessageService } from 'src/app/Shared/services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonalService } from 'src/app/Modules/rrhh/services/personal.service';
import { PersonalDTO } from 'src/app/Modules/rrhh/model/personal.dto';
import { formatSqlDate } from 'src/app/Shared/utils/formatter';

@Component({
  selector: 'app-nova-participacio',
  templateUrl: './nova-participacio.component.html',
  styleUrls: ['./nova-participacio.component.scss']
})
export class NovaParticipacioComponent implements OnInit {
  
  partForm: FormGroup;
  codiempl: FormControl;
  nomempl: FormControl;
  data: FormControl;
  questionari: FormControl;
  grup: FormControl;
  nivell: FormControl;
  conv : CpConvocatoriaDTO | null;
  updating: boolean;
  readingNom: boolean;
  constructor(    
      private router: Router,
      private formBuilder: FormBuilder,
      private carreraService: CarreraService,
      private personalService: PersonalService,
      private messageService: MessageService,      
      private menuCarreraService: MenuCarreraService,
  ) {
    this.updating=false;
    this.readingNom=false;
    this.conv=menuCarreraService.convocatoria;
    this.codiempl=new FormControl('', Validators.required);
    this.questionari=new FormControl('', Validators.required);
    this.grup=new FormControl('', Validators.required);
    this.nivell=new FormControl('', Validators.required);
    this.nomempl=new FormControl({value: '', disabled: true}, Validators.required);
    this.data=new FormControl('', Validators.required);
    this.partForm=this.formBuilder.group({
      codiempl:this.codiempl,
      datareg:this.data,
      questionari: this.questionari,
      grup: this.grup,
      nivell:this.nivell
    });
  }

  ngOnInit(): void {
  }

  consultarPersonal(): void {
    this.readingNom=true;
    this.personalService.filterByCodi('1',this.codiempl.value).subscribe(
      (result: PersonalDTO[]) => {
        if (result.length>0)
          this.nomempl.setValue(result[0].apellid1+' '+result[0].apellid2+' '+result[0].nombre)
        else
          this.nomempl.setValue('');
        this.readingNom=false;
      },
      (error: HttpErrorResponse) => {
        this.readingNom=false;
        this.nomempl.setValue('');
      }
    );
  }

  afegirParticipant(): void {
    if (this.partForm.valid) {
    this.updating=true;
    this.carreraService.afegirParticipacio(this.conv==null?0:this.conv.kconvocatoria, this.codiempl.value, this.data.value, this.questionari.value, this.grup.value, this.nivell.value).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('carrera/participacio-list');
      },
      (error: HttpErrorResponse) => {
        this.updating = false;
        this.messageService.showHttpResponseError(
          'Feedback',
          error
        );
      }
    );
    }
  }

  tornar() {
    this.router.navigateByUrl('carrera/participacio-list');
  }  
}
