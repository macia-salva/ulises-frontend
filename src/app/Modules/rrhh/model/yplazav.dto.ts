import { YPlazaDTO } from "./yplaza.dto";

export class YplazavDTO {
    codiclad: string;
    codidpla: string;
    codiesad: string;
    codigrup: string;
    codisesc: string;
    extingui: string;
    finivers: Date | null;
    ffinvers: Date | null;
    id:       YplazaVDTOID;
    somefunc: string;
    yplaza: YPlazaDTO;

    constructor() {
        this.codiclad= '';
        this.codidpla= '';
        this.codiesad= '';
        this.codigrup= '';
        this.codisesc= '';
        this.extingui= '';
        this.finivers= null;
        this.ffinvers= null;
        this.id=       new YplazaVDTOID();
        this.somefunc= '';
        this.yplaza = new YPlazaDTO();
    
    }
}

export class YplazaVDTOID {
    codienti:  number;
    coditpla:  number;
    natuplaz:  string;
    verstpla:  number;

    constructor() {
        this.codienti=  0;
        this.coditpla=  0;
        this.natuplaz=  '';
        this.verstpla=  0;        
    }
}
