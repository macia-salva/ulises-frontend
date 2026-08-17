import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { checkAllowedAction } from 'src/app/Shared/model/security-manager';
import { MessageService } from 'src/app/Shared/services/message.service';
import { UsuariDTO } from '../../model/usuari.dto';
import { UsuariService } from '../../services/usuari.service';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { AuthStorageService } from 'src/app/Shared/services/auth-storage.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usuaris: UsuariDTO[];
  filterForm: FormGroup;
  nomcomplet: FormControl;
  usuariDisplayedColumns: string[] = ['entrada', 'nomcomplet', 'actions'];
  canSelect: boolean;
  canUpdate: boolean;
  canInsert: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuariService: UsuariService,
    private authStorageService: AuthStorageService,
    private messageService: MessageService
  ) {
    this.usuaris = [];
    this.nomcomplet = new FormControl('', [Validators.minLength(3)]);
    this.filterForm = this.formBuilder.group({
      nomcomplet: this.nomcomplet,
    });
    this.canSelect = false;
    this.canUpdate = false;
    this.canInsert = false;
    const auth=authStorageService.getAuth();
    if (auth) {

      if (auth.access_token) {
        this.canSelect = checkAllowedAction(
          auth,
          'USUARI',
          'SELECT'
        );
        this.canUpdate = checkAllowedAction(
          auth,
          'USUARI',
          'UPDATE'
        );
        this.canInsert = checkAllowedAction(
          auth,
          'USUARI',
          'INSERT'
        );
      }
    };
  }

  ngOnInit(): void {}

  filter(): void {
    if (this.filterForm.valid)
      this.usuariService.filterUsers(this.nomcomplet.value).subscribe(
        (users: UsuariDTO[]) => {
          this.usuaris = users;
        },
        (error) => {
          this.messageService.showHttpResponseError('userFeedback', error);
        }
      );
  }

  hasData(): boolean {
    return this.usuaris.length > 0;
  }

  afegirUsuari(): void {
    this.router.navigateByUrl('users/user-form/');
  }

  updateUsuari(kusuari: number): void {
    this.router.navigateByUrl('users/user-form/' + kusuari);
  }
}
