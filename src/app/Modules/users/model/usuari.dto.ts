import { RoleDTO } from 'src/app/Modules/auth/models/role.dto';

export class UsuariDTO {
  kusuari?: number;
  entrada: string;
  nomcomplet: string;
  password: string;
  repeatpassword?: string;
  role: RoleDTO;

  constructor(
    kusuari: number,
    entrada: string,
    nomcomplet: string,
    password: string,
    role: RoleDTO
  ) {
    this.kusuari = kusuari;
    this.entrada = entrada;
    this.password = password;
    this.nomcomplet = nomcomplet;
    this.role = role;
  }
}
