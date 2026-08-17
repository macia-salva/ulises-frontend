import { MnOpcioDTO } from "./mnopcio.dto";

export class OpcioRoleDTO {
    mnOpcio:MnOpcioDTO;
    swdelete:boolean;
    swinsert:boolean;
    swupdate:boolean;
    swselect:boolean;

    constructor(mnOpcio:MnOpcioDTO, swdelete:boolean, swinsert:boolean,swupdate:boolean,swselect:boolean) {
        this.mnOpcio=mnOpcio;
        this.swdelete=swdelete;
        this.swinsert=swinsert;
        this.swupdate=swupdate;
        this.swselect=swselect;
    }
}