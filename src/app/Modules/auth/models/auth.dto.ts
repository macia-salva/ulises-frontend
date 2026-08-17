import { OpcioRoleDTO } from "./opciorole.dto";

export class AuthDTO {
  username: string;
  access_token: string;
  refresh_token: string;
  canviPassword: boolean;
  endsesion: number;
  opcions: OpcioRoleDTO[];

  constructor(
    username: string,
    access_token: string,
    refresh_token: string,
    canviPassword: boolean,
    endsesion: number,
    opcions:OpcioRoleDTO[]
  ) {
    this.username = username;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.canviPassword=canviPassword;
    this.opcions=opcions;
    this.endsesion=endsesion;
  }
}
