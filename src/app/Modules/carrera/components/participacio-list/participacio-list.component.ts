import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService } from '../../services/carrera.service';
import { MessageService } from 'src/app/Shared/services/message.service';
import { CpParticipacioDTO } from '../../model/cpparticipacio.dto';
import { MenuCarreraService } from '../../services/menu-carrera.service';
import { CpConvocatoriaDTO } from '../../model/cpconvocatoria.dto';
import { CpResultatParticipacioDTO } from '../../model/cpresultatparticipacio.dto';

@Component({
  selector: 'app-participacio-list',
  templateUrl: './participacio-list.component.html',
  styleUrls: ['./participacio-list.component.scss'],
})
export class ParticipacioListComponent implements OnInit {
  llistaParticipacions: CpParticipacioDTO[];
  convocatoria: CpConvocatoriaDTO | null;
  accio: string | null;
  updating: boolean;
  displayedColumns: string[] = [
    'codi',
    'nom',
    'datareg',
    'nivell',
    'estat',
    'resultat',
    'canviarResultat',
    'motiu',
    'oper',
  ];

  constructor(
    private router: Router,
    private carreraService: CarreraService,
    private menuCarreraService: MenuCarreraService,
    private messageService: MessageService,
  ) {
    this.accio = this.menuCarreraService.mode;
    this.llistaParticipacions = [];
    this.convocatoria = menuCarreraService.convocatoria;
    this.updating = false;
  }

  canviarResultat(part: CpParticipacioDTO) {
    let confirmacio: boolean = confirm(
      'Estas segur de que vols canviar el resultat?'
    );
    if (confirmacio) {
      this.carreraService.canviarEstatConvocatoria(part).subscribe({
        next: (response) => {
          this.obtenirParticipacions();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Ha ocurrido un error al cambiar el estado');
        }
      });
    }
  }

  ngOnInit(): void {
    this.obtenirParticipacions();
  }

  obtenirParticipacions(): void {
    this.updating = true;
    this.carreraService
      .findPartipacions(
        this.convocatoria == null ? 0 : this.convocatoria?.kconvocatoria
      )
      .subscribe(
        (llistaParticipacions: CpParticipacioDTO[]) => {
          this.llistaParticipacions = llistaParticipacions;
          this.updating = false;
        },
        (error) => {
          this.updating = false;
          this.messageService.showHttpResponseError('Feedback', error);
        }
      );
  }

  tornar() {
    this.router.navigateByUrl('carrera/convocatoria-list');
  }

  select(part: CpParticipacioDTO) {
    this.menuCarreraService.participacio = part;
    this.router.navigateByUrl('carrera/participacio/select');
  }

  update(part: CpParticipacioDTO) {
    this.menuCarreraService.participacio = part;
    this.router.navigateByUrl('carrera/participacio/update');
  }

  insert() {
    this.router.navigateByUrl('carrera/nova-participacio');
  }

  deleteParticipacio(part: CpParticipacioDTO) {
    let conf: boolean = confirm(
      'Estas segur de voler esborrar els càlculs de :' +
      part.personal.nomcomplet
    );
    if (conf) {
      this.updating = true;
      this.carreraService
        .deleteParticipacio(
          part
        )
        .subscribe(
          (resultat: CpParticipacioDTO[]) => {
            this.llistaParticipacions = resultat;
            this.updating = false;
          },
          (error) => {
            this.updating = false;
            this.messageService.showHttpResponseError('Feedback', error);
          }
        );
    }
  }

  refresh(part: CpParticipacioDTO) {
    let conf: boolean = confirm(
      'Estas segur de voler reiniciar els càlculs de :' +
      part.personal.nomcomplet
    );
    if (conf) {
      this.updating = true;
      this.carreraService
        .refreshPartipacio(
          part
        )
        .subscribe(
          (resultat: CpResultatParticipacioDTO) => {
            this.obtenirParticipacions();

          },
          (error) => {
            this.updating = false;
            this.messageService.showHttpResponseError('Feedback', error);
          }
        );
    }
  }
}
