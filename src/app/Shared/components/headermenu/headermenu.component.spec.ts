import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthDTO } from 'src/app/Modules/auth/models/auth.dto';
import { MnOpcioDTO } from 'src/app/Modules/auth/models/mnopcio.dto';
import { OpcioRoleDTO } from 'src/app/Modules/auth/models/opciorole.dto';
import { HeadermenuComponent } from './headermenu.component';

const initialAuthState = {
  authentication: new AuthDTO('', '', '', false, []),
  loggedIn: false,
  processing: false,
  logged: false,
  passwordChanged: false,
  error: null,
};

const superadminAuthState = {
  authentication: new AuthDTO('admin', 'acces_token', 'refresh_token', false, [
    new OpcioRoleDTO(new MnOpcioDTO('CADASTRE', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('INFO', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('ORDENANCES', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('PASSWORD', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('SANCIO', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('USUARI', ''), true, true, true, true),
  ]),
  loggedIn: false,
  processing: false,
  logged: true,
  passwordChanged: false,
  error: null,
};

const administratiuAuthState = {
  authentication: new AuthDTO('admin', 'acces_token', 'refresh_token', false, [
    new OpcioRoleDTO(new MnOpcioDTO('CADASTRE', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('INFO', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('ORDENANCES', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('PASSWORD', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('USUARI', ''), true, true, true, true),
  ]),
  loggedIn: false,
  processing: false,
  logged: true,
  passwordChanged: false,
  error: null,
};

const agentAuthState = {
  authentication: new AuthDTO('admin', 'acces_token', 'refresh_token', false, [
    new OpcioRoleDTO(new MnOpcioDTO('CADASTRE', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('INFO', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('ORDENANCES', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('PASSWORD', ''), true, true, true, true),
    new OpcioRoleDTO(new MnOpcioDTO('SANCIO', ''), true, true, true, true),
  ]),
  loggedIn: false,
  processing: false,
  logged: true,
  passwordChanged: false,
  error: null,
};

const initialState = { auth: initialAuthState };
const superadminState = { auth: superadminAuthState };
const administratiuState = { auth: administratiuAuthState };
const agentState = { auth: agentAuthState };

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
  let component: HeadermenuComponent;
  let fixture: ComponentFixture<HeadermenuComponent>;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'auth/login',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'info/search',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'ordenances/ordenances-list',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'users/users-list',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'auth/change-password',
            component: TemporalComponentForRoutes,
          },
          {
            path: 'sancions/sancions-list',
            component: TemporalComponentForRoutes,
          },
        ]),
        MatMenuModule,
      ],
      declarations: [HeadermenuComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadermenuComponent);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Header Component creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Navegación correcta a Info Sanciones', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.infoSancions();
    expect(spy).toHaveBeenCalledWith('sancio/persones-list');
  });

  it('Navegación correcta a Sanciones', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.sancions();
    expect(spy).toHaveBeenCalledWith('sancio/actes-list');
  });

  it('Navegación correcta a Ordenanzas', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.ordenances();
    expect(spy).toHaveBeenCalledWith('ordenances/ordenances-list');
  });

  it('Navegación correcta a Usuarios', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.usuaris();
    expect(spy).toHaveBeenCalledWith('users/users-list');
  });

  it('Solo opción login con usuario sin identificar', () => {
    store.setState(initialState);
    store.refreshState();
    fixture.detectChanges();
    let buttonLabels: string[] = extractButtonLabels(fixture);
    expect(buttonLabels).toEqual(['Login']);
  });

  it('Todas las opciones con rol superadmin', () => {
    store.setState(superadminState);
    store.refreshState();
    fixture.detectChanges();
    let buttonLabels: string[] = extractButtonLabels(fixture);
    expect(buttonLabels).toEqual([
      ' Usuarios ',
      ' Ordenanzas ',
      ' Sanciones ',
      ' Consultas ',
      'Logout',
      'vpn_key',
      'help_outline',
    ]);
  });

  it('Solo las opciones permitidas con rol administrativo', () => {
    store.setState(administratiuState);
    store.refreshState();
    fixture.detectChanges();
    let buttonLabels: string[] = extractButtonLabels(fixture);
    expect(buttonLabels).toEqual([
      ' Usuarios ',
      ' Ordenanzas ',
      ' Consultas ',
      'Logout',
      'vpn_key',
      'help_outline',
    ]);
  });

  it('Solo las opciones permitidas con rol agente', () => {
    store.setState(agentState);
    store.refreshState();
    fixture.detectChanges();
    let buttonLabels: string[] = extractButtonLabels(fixture);
    expect(buttonLabels).toEqual([
      ' Ordenanzas ',
      ' Sanciones ',
      ' Consultas ',
      'Logout',
      'vpn_key',
      'help_outline',
    ]);
  });
});

//Extracción de los labels de los buttons del header en formato array
function extractButtonLabels(
  fixture: ComponentFixture<HeadermenuComponent>
): string[] {
  let buttons: NodeListOf<Element> =
    fixture.nativeElement.querySelectorAll('button');
  let buttonLabels: string[] = [];
  buttons.forEach((button: Element) => {
    if (button.textContent !== '' && button.textContent !== 'menu') {
      buttonLabels = [
        ...buttonLabels,
        button.textContent ? button.textContent : '',
      ];
    }
  });
  return buttonLabels;
}
