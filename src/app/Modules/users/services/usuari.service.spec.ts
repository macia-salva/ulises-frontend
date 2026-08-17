import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { apiconfig } from 'src/app/Shared/model/apitool';
import { UsuariDTO } from '../model/usuari.dto';
import { UsuariService } from './usuari.service';

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

describe('UsuariService', () => {
  let service: UsuariService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuariService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(UsuariService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Usuari Service creado correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('filterUsers retorna una lista de usuarios con llamada de tipo GET', () => {
    //Nos suscribimos a la llamada al servicio, el resultado debería ser igual al mock
    service.filterUsers('TOUS').subscribe((resp: UsuariDTO[]) => {
      expect(resp).toEqual(usersList);
    });
    //Definimos la petición mock a la url correcta
    const req = httpMock.expectOne(
      apiconfig.apiurl + 'usuari/list?filter=TOUS'
    );
    //Verificamos que el método sea del tipo GET
    expect(req.request.method).toBe('GET');

    //Lanzamos la simulación a la petición reemplazando el resultado por el mock
    req.flush(usersList);
  });

  it('addUser retorna un usuariDTO coincidente con la post creada con llamada de tipo POST', () => {
    //Nos suscribimos a la llamada al servicio, el resultado debería ser igual al mock
    service.addUser(usersList[0]).subscribe((resp: UsuariDTO) => {
      expect(resp).toEqual(usersList[0]);
    });
    //Definimos la petición mock a la url correcta
    const req = httpMock.expectOne(apiconfig.apiurl + 'usuari');
    //Verificamos que el método sea del tipo GET
    expect(req.request.method).toBe('POST');

    //Lanzamos la simulación a la petición reemplazando el resultado por el mock
    req.flush(usersList[0]);
  });

  it('updateUser retorna un usuariDTO coincidente con la post creada con llamada de tipo POST', () => {
    //Nos suscribimos a la llamada al servicio, el resultado debería ser igual al mock
    service.updateUser(usersList[0]).subscribe((resp: UsuariDTO) => {
      expect(resp).toEqual(usersList[0]);
    });
    //Definimos la petición mock a la url correcta
    const req = httpMock.expectOne(apiconfig.apiurl + 'usuari');
    //Verificamos que el método sea del tipo GET
    expect(req.request.method).toBe('PUT');

    //Lanzamos la simulación a la petición reemplazando el resultado por el mock
    req.flush(usersList[0]);
  });

  it('getUser retorna un UsuariDTO con llamada de tipo GET', () => {
    //Nos suscribimos a la llamada al servicio, el resultado debería ser igual al mock
    service.getUser('2').subscribe((resp: UsuariDTO) => {
      expect(resp).toEqual(usersList[1]);
    });
    //Definimos la petición mock a la url correcta
    const req = httpMock.expectOne(
      apiconfig.apiurl + 'usuari/' + usersList[1].kusuari
    );
    //Verificamos que el método sea del tipo GET
    expect(req.request.method).toBe('GET');

    //Lanzamos la simulación a la petición reemplazando el resultado por el mock
    req.flush(usersList[1]);
  });
});
