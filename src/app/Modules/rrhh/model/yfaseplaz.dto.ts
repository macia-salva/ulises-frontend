export class Yfaseplaz {
    codiempl: number;
    codirela: string;
    expemfin: string;
    expemini: string;
    fcrefase: Date | null;
    fechcese: Date | null;
    fechpose: Date | null;
    fexpmfin: Date | null;
    fexpmini: Date | null;
    id:       YFasePlazDTOID;
    mfinplaz: string;
    miniplaz: string;

    constructor() {
        this.codiempl= 0;
        this.codirela= '';
        this.expemfin= '';
        this.expemini= '';
        this.fcrefase= null;
        this.fechcese= null;
        this.fechpose= null;
        this.fexpmfin= null;
        this.fexpmini= null;
        this.id=       new YFasePlazDTOID();
        this.mfinplaz= '';
        this.miniplaz= '';
    }
}

export class YFasePlazDTOID {
    codienti:  number;
    codiplaz:  number;
    coditpla:  number;
    natuplaz:  string;
    numefase:  number;

    constructor() {
        this.codienti=  0;
        this.codiplaz=  0;
        this.coditpla=  0;
        this.natuplaz=  '';
        this.numefase=  0;
    }
}


