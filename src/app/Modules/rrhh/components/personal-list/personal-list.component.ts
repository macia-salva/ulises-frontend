import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { PersonalDTO } from '../../model/personal.dto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Shared/services/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PersonalService } from '../../services/personal.service';
import { MenuPersonalService } from '../../services/menu-personal.service';



@Component({
  selector: 'app-persona-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {

  llistaPersonal: PersonalDTO[];
  filterForm: FormGroup;
  document: FormControl;
  codienti: FormControl;
  codiempl: FormControl;
  apellid1: FormControl;
  apellid2: FormControl;
  destroyed = new Subject<void>();
  isMobile: boolean;
  isSearching: boolean;
  canSelect: boolean;
  canUpdate: boolean;
  canInsert: boolean;
  canDelete: boolean;
  
  personalDisplayedColumns: string[] = [
    'codi',
    'document',
    'nom',
    'apellid1',
    'apellid2',
    'codiempl',
    'actions'
  ];


  constructor(    
    private router: Router,
    private formBuilder: FormBuilder,
    private personalService: PersonalService,
    private messageService: MessageService,
    private breakpointObserver: BreakpointObserver,
    private menuPersonalService: MenuPersonalService,
) { 
  this.llistaPersonal = [];
  this.document = new FormControl('');
  this.codienti = new FormControl('');
  this.codiempl = new FormControl('');
  this.apellid1 = new FormControl('');
  this.apellid2 = new FormControl('');
  this.filterForm = this.formBuilder.group({
    document: this.document,
    codienti: this.codienti,
    codiempl: this.codiempl,
    apellid1: this.apellid1,
    apellid2: this.apellid2,
  });
  this.canSelect = true;
  this.canUpdate = true;
  this.canInsert = true;
  this.canDelete = true;
  this.isMobile = false;
  this.isSearching = false;
  this.initObserver();
  }

  ngOnInit(): void {
  }

  private initObserver() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.isMobile = query === Breakpoints.XSmall;
          }
        }
      });
  }

  hasData(): boolean {
    return this.llistaPersonal.length > 0;
  }


  filterByDocument(): void {
    if (this.document.value !== '') {
      this.isSearching=true;
      this.personalService.filterByDocument(this.document.value).subscribe(
        (llistaPersonal: PersonalDTO[]) => {
          this.llistaPersonal = llistaPersonal;
          this.isSearching=false;
        },
        (error) => {
          this.messageService.showHttpResponseError('personalFeedback', error);
          this.isSearching=false;
        },
      );
    }
  }


  filterByCodi(): void {
    if (this.codiempl.value !== '' && this.codienti.value !== '') {
      this.isSearching=true;
      this.personalService
        .filterByCodi(this.codienti.value, this.codiempl.value)
        .subscribe(
          (llistaPersonal: PersonalDTO[]) => {
            this.llistaPersonal = llistaPersonal;
          },
          (error) => {
            this.messageService.showHttpResponseError(
              'personalFeedback',
              error
            );
          },
          ()=>this.isSearching=false
        );
    }
  }


  filterByNom(): void {
    if (this.apellid1.value !== '') {
      this.isSearching=true;
      this.personalService
        .filterByNom(this.apellid1.value, this.apellid2.value)
        .subscribe(
          (llistaPersonal: PersonalDTO[]) => {
            this.llistaPersonal = llistaPersonal;
          },
          (error) => {
            this.messageService.showHttpResponseError(
              'personalFeedback',
              error
            );
          },
          ()=>this.isSearching=false
        );
    }
  }

  updatePersonal(personal:PersonalDTO) {
    this.menuPersonalService.setPersonal(personal);
    this.router.navigateByUrl('rrhh/personal');
  }


}
