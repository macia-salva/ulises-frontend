import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleDTO } from 'src/app/Modules/auth/models/role.dto';
import { MessageService } from 'src/app/Shared/services/message.service';
import {
  passwordPattern,
  repeatPasswordValidator,
} from 'src/app/Shared/validators/password.validator';
import { UsuariDTO } from '../../model/usuari.dto';
import { UsuariService } from '../../services/usuari.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  usuari: UsuariDTO;
  entrada: FormControl;
  password: FormControl;
  nomcomplet: FormControl;
  repeatpassword: FormControl;
  userForm: FormGroup;
  kusuari: string | null;
  roleList: RoleDTO[];
  updateMode: boolean;
  titulo: string;
  selectedRole: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private usuariService: UsuariService
  ) {
    this.updateMode = false;
    this.kusuari = this.activatedRoute.snapshot.paramMap.get('kusuari');
    this.usuari = new UsuariDTO(0, '', '', '', new RoleDTO(0, ''));
    this.entrada = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
    ]);
    this.nomcomplet = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    if (this.kusuari) {
      this.password = new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(passwordPattern),
      ]);
    } else {
      this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(passwordPattern),
      ]);
    }
    this.repeatpassword = new FormControl('');

    this.roleList = [];
    this.titulo = 'Alta de usuario';
    this.selectedRole = '';

    this.userForm = this.formBuilder.group(
      {
        entrada: this.entrada,
        nomcomplet: this.nomcomplet,
        password: this.password,
        repeatpassword: this.repeatpassword,
      },
      { validators: repeatPasswordValidator }
    );
  }

  loadRoles(): void {
    this.usuariService.getRoleList().subscribe(
      (roleList: RoleDTO[]) => {
        this.roleList = roleList;
        this.selectedRole = this.roleList[0].krole.toString();
      },
      (error: HttpErrorResponse) =>
        this.messageService.showHttpResponseError('userFeedback', error)
    );
  }

  ngOnInit(): void {
    this.loadRoles();

    if (this.kusuari) {
      this.updateMode = true;
      this.titulo = 'Modificación de Usuario';
      //this.passwordValidators();
      this.usuariService.getUser(this.kusuari).subscribe(
        (usuari: UsuariDTO) => {
          this.usuari = usuari;
          this.entrada.setValue(this.usuari.entrada);
          this.nomcomplet.setValue(this.usuari.nomcomplet);
          this.selectedRole = this.usuari.role.krole.toString();
        },
        (error: HttpErrorResponse) =>
          this.messageService.showHttpResponseError('userFeedback', error)
      );
    }
  }

  private updateUser(): void {
    if (this.kusuari) {
      this.usuari.kusuari = Number(this.kusuari);
      this.usuariService.updateUser(this.usuari).subscribe(
        () => {
          this.router.navigateByUrl('users/users-list');
        },
        (error: HttpErrorResponse) => {
          this.messageService.showHttpResponseError(
            'userFeedback',
            error
          );
        }
      );
    }
  }

  private createUser(): void {
    this.usuariService.addUser(this.usuari).subscribe(
      () => {
        this.router.navigateByUrl('users/users-list');
      },
      (error: HttpErrorResponse) => {
        this.messageService.showHttpResponseError('userFeedback', error);
      }
    );
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.usuari = {
      ...this.userForm.value,
      role: this.getRole(),
    };

    if (this.updateMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  exit(): void {
    this.router.navigateByUrl('users/users-list');
  }

  private getRole(): RoleDTO {
    return this.roleList.filter((role) => {
      return role.krole === Number(this.selectedRole);
    })[0];
  }
}
