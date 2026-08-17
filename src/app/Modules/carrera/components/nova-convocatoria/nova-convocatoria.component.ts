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
  selector: 'app-nova-convocatoria',
  templateUrl: './nova-convocatoria.component.html',
  styleUrls: ['./nova-convocatoria.component.scss']
})
export class NovaConvocatoriaComponent implements OnInit {

    convForm: FormGroup;
    descripcio: FormControl;
    tipus: FormControl;
    datareco: FormControl;

    updating: boolean;

  constructor(    
      private router: Router,
      private formBuilder: FormBuilder,
      private carreraService: CarreraService,
      private personalService: PersonalService,
      private messageService: MessageService,      
      private menuCarreraService: MenuCarreraService,
  ) {
    this.updating=false;
    this.descripcio=new FormControl('', Validators.required);
    this.tipus=new FormControl('', Validators.required);
    this.datareco=new FormControl('', Validators.required);
    this.convForm=this.formBuilder.group({
      descripcio:this.descripcio,
      tipus: this.tipus,
      dataReconeixement:this.datareco
    });
  }

  ngOnInit(): void {
  }

  afegirConvocatoria(): void {
    if (this.convForm.valid) {
        this.updating=true;
        this.carreraService.afegirConvocatoria(this.convForm.value).subscribe(
      () => {
        this.updating = false;
        this.router.navigateByUrl('carrera/convocatoria-list');
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
    this.router.navigateByUrl('carrera/convocatoria-list');
  }    

}