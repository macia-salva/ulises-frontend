import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AuthDTO } from 'src/app/Modules/auth/models/auth.dto';
import { UsuariDTO } from '../../model/usuari.dto';
import { UsuariService } from '../../services/usuari.service';
import { UsersListComponent } from './users-list.component';
//mock lista de categorías
const usersList: UsuariDTO[] = [
  {
    kusuari: 1,
    entrada: 'PEDRO',
    password: '',
    nomcomplet: 'PEDRO TOUS',
    role: {
      krole: 1,
      nom: 'SUPERADMIN',
    },
  },
  {
    kusuari: 2,
    entrada: 'JOAN',
    password: '',
    nomcomplet: 'JOAN TOUS',
    role: {
      krole: 2,
      nom: 'ADMINISTRATIU',
    },
  },
];
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
describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'users/user-form/:kusuari',
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      declarations: [UsersListComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    //    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('UsersListComponent creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('loadUsers funciona correctamente desde una suscripción', () => {
    const usersService = fixture.debugElement.injector.get(UsuariService);

    const spy = spyOn(usersService, 'filterUsers').and.returnValue(
      of(usersList)
    );
    component.nomcomplet.setValue('TOUS');
    component['filter']();
    expect(spy).toHaveBeenCalled();
    expect(component.usuaris).toBe(usersList);
  });

  it('Navegamos correctamente cunado queremos añadir un Usuario', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.afegirUsuari();
    expect(spy).toHaveBeenCalledWith('users/user-form/');
  });

  it('Navegamos correctamente cunado queremos actualizar un Usuario', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.updateUsuari(1);
    expect(spy).toHaveBeenCalledWith('users/user-form/1');
  });
});
