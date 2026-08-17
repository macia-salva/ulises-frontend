import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AuthDTO } from 'src/app/Modules/auth/models/auth.dto';
import { RoleDTO } from 'src/app/Modules/auth/models/role.dto';
import { UsuariDTO } from '../../model/usuari.dto';
import { UsuariService } from '../../services/usuari.service';
import { UserFormComponent } from './user-form.component';
//mock lista de categorías

const usuariUpdate: UsuariDTO = {
  kusuari: 1,
  entrada: 'PTOUS',
  password: 'Pedro_100',
  repeatpassword: 'Pedro_100',
  nomcomplet: 'PEDRO TOUS',
  role: new RoleDTO(1, 'SUPERADMIN'),
};

const usuariInsert: UsuariDTO = {
  entrada: 'PTOUS',
  password: 'Pedro_100',
  repeatpassword: 'Pedro_100',
  nomcomplet: 'PEDRO TOUS',
  role: new RoleDTO(1, 'SUPERADMIN'),
};

const initialAuthState = {
  authentication: new AuthDTO(
    'admin',
    'acces_token',
    'refresh_token',
    false,
    []
  ),
  loggedIn: false,
  processing: false,
  logged: true,
  passwordChanged: false,
  error: null,
};

const initialState = { auth: initialAuthState };

class TemporalComponentForRoutes {}
describe('UserFormomponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'users/users-list',
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      declarations: [UserFormComponent],
      providers: [UsuariService, provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    //    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('UserFormComponent creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Se llama a la la funcion updateUser del servicio UsuariService al actualizar un usuario', () => {
    const usersService = fixture.debugElement.injector.get(UsuariService);

    const spy = spyOn(usersService, 'updateUser').and.returnValue(
      of(usuariUpdate)
    );

    component.kusuari = '1';
    component.selectedRole = '1';
    component.updateMode = true;
    component.entrada.setValue(usuariUpdate.entrada);
    component.nomcomplet.setValue(usuariUpdate.nomcomplet);
    component.password.setValue(usuariUpdate.password);
    component.repeatpassword.setValue(usuariUpdate.password);
    component.roleList = [new RoleDTO(1, 'SUPERADMIN')];
    component['saveUser']();
    expect(spy).toHaveBeenCalled();
    expect(component.usuari).toEqual(usuariUpdate);
  });

  it('Se llama a la la funcion addUser del servicio UsuariService al añadir un usuario', () => {
    const usersService = fixture.debugElement.injector.get(UsuariService);

    const spy = spyOn(usersService, 'addUser').and.returnValue(
      of(usuariInsert)
    );

    component.selectedRole = '1';
    component.updateMode = false;
    component.entrada.setValue(usuariInsert.entrada);
    component.nomcomplet.setValue(usuariInsert.nomcomplet);
    component.password.setValue(usuariInsert.password);
    component.repeatpassword.setValue(usuariInsert.password);
    component.roleList = [new RoleDTO(1, 'SUPERADMIN')];
    component['saveUser']();
    expect(spy).toHaveBeenCalled();
    expect(component.usuari).toEqual(usuariInsert);
  });

  /*TEST4: valide que se lanza el navigateByUrl con el argumento correcto cuando creamos una categoría*/
  it('Navegamos correctamente cunado pulsamos exit', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.exit();
    expect(spy).toHaveBeenCalledWith('users/users-list');
  });

  it('Formato Correcto password ', () => {
    component.password.setValue(usuariUpdate.password);
    expect(component.password.hasError('pattern')).toBeFalse();
  });

  it('Formato Inorrecto password ', () => {
    component.password.setValue('password');
    expect(component.password.hasError('pattern')).toBeTrue();
  });
});
