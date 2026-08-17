import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { AuthDTO } from '../models/auth.dto';
import { LoginDTO } from '../models/login.dto';
import { AuthService } from './auth.service';

const login: LoginDTO = new LoginDTO('user', 'password', 'newpassword',0);
const auth: AuthDTO = new AuthDTO(
  'username',
  'acces_token',
  'refresh_token',
  0,
  false,
  false,
  '',
  []
);
const newauth: AuthDTO = new AuthDTO(
  'username',
  'newacces_token',
  'newrefresh_token',
  0,
  false,
  false,
  '',
  []
);
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('AuthService creado correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('login retorna una autorización con llamada de tipo POST', () => {
    //Nos suscribimos a la llamada al servicio, el resultado debería ser igual al mock
    service.login(login).subscribe((resp: AuthDTO) => {
      expect(resp).toEqual(auth);
    });
    //Definimos la petición mock a la url correcta
    const req = httpMock.expectOne(apiconfig.apiurl + 'authentication');
    //Verificamos que el método sea del tipo GET
    expect(req.request.method).toBe('POST');

    //Lanzamos la simulación a la petición reemplazando el resultado por el mock
    req.flush(auth);
  });

  it('changePassword retorna una autorización con llamada de tipo POST', () => {
    //Nos suscribimos a la llamada al servicio, el resultado debería ser igual al mock
    service.changePassword(login).subscribe((resp: AuthDTO) => {
      expect(resp).toEqual(auth);
    });
    //Definimos la petición mock a la url correcta
    const req = httpMock.expectOne(apiconfig.apiurl + 'usuari/changePassword');
    //Verificamos que el método sea del tipo GET
    expect(req.request.method).toBe('POST');

    //Lanzamos la simulación a la petición reemplazando el resultado por el mock
    req.flush(auth);
  });

  it('refreshToken retorna una autorización con llamada de tipo POST', () => {
    //Nos suscribimos a la llamada al servicio, el resultado debería ser igual al mock
    service.refreshToken(auth).subscribe((resp: AuthDTO) => {
      expect(resp).toEqual(newauth);
    });
    //Definimos la petición mock a la url correcta
    const req = httpMock.expectOne(
      apiconfig.apiurl + 'authentication/refreshToken'
    );
    //Verificamos que el método sea del tipo GET
    expect(req.request.method).toBe('POST');

    //Lanzamos la simulación a la petición reemplazando el resultado por el mock
    req.flush(newauth);
  });
});
