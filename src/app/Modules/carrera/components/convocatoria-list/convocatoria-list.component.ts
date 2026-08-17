import { Component, OnInit } from '@angular/core';
import { CpConvocatoriaDTO } from '../../model/cpconvocatoria.dto';
import { Router } from '@angular/router';
import { CarreraService } from '../../services/carrera.service';
import { MessageService } from 'src/app/Shared/services/message.service';
import { Subject } from 'rxjs';
import { MenuCarreraService } from '../../services/menu-carrera.service';

@Component({
  selector: 'app-convocatoria-list',
  templateUrl: './convocatoria-list.component.html',
  styleUrls: ['./convocatoria-list.component.scss'],
})
export class ConvocatoriaListComponent implements OnInit {
  llistaConvocatories: CpConvocatoriaDTO[];
  destroyed = new Subject<void>();

  convDisplayedColumns: string[] = ['descripcio', 'tipus', 'datarec','estat','oper'];

  constructor(
    private router: Router,
    private carreraService: CarreraService,
    private menuCarreraService: MenuCarreraService,
    private messageService: MessageService,
  ) {
    this.llistaConvocatories = [];
  }


  ngOnInit(): void {
    this.obtenirConvocatories();
  }

  obtenirConvocatories(): void {
    this.carreraService.findConvocatories().subscribe(
      (llistaConvocatories: CpConvocatoriaDTO[]) => {
        this.llistaConvocatories = llistaConvocatories;
      },
      (error) => {
        this.messageService.showHttpResponseError(
          'convocatoriesFeedback',
          error
        );
      }
    );
  }

  stop(conv: CpConvocatoriaDTO): void {
    let confi=confirm("Està segur de voler tancar la convocatòria?");
    if (confi) {
    this.carreraService.tancarConvocatoria(conv).subscribe(
      (convocatoria: CpConvocatoriaDTO) => {
        this.obtenirConvocatories();
      },
      (error) => {
        this.messageService.showHttpResponseError(
          'convocatoriesFeedback',
          error
        );
      }
    );
  }
  }  

  select(conv: CpConvocatoriaDTO) {
    this.menuCarreraService.convocatoria = conv;
    this.menuCarreraService.mode = 'select';
    this.router.navigateByUrl('carrera/participacio-list');
  }

  update(conv: CpConvocatoriaDTO) {
    this.menuCarreraService.convocatoria = conv;    
    this.menuCarreraService.mode = 'update';
    this.router.navigateByUrl('carrera/participacio-list');
  }

  insert() {
    this.router.navigateByUrl('carrera/nova-convocatoria');    
  }  
}
