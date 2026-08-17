export class Ydotaplazv {
    amortiza:         string;
    amortizada:       string;
    extingui:         string;
    finivers:         Date | null;
    ffinvers:         Date | null;
    id:               YdotaplazvID;
    planFuncionariza: string;
    planOpeProceso:   string;
    porcjorn:         number;
    somefunc:         string;
    tcompl:           string;

    constructor() {
        this.amortiza=         '';
        this.amortizada=       '';
        this.extingui=         '';
        this.finivers=         null;
        this.ffinvers=         null;
        this.id=               new YdotaplazvID();
        this.planFuncionariza= '';
        this.planOpeProceso=   '';
        this.porcjorn=         0;
        this.somefunc=         '';
        this.tcompl=           '';        
    }
}

export class YdotaplazvID {
    codienti:  number;
    codiplaz: number;
    coditpla:  number;
    natuplaz:  string;
    versplaz: number;
    verstpla: number;
    
    constructor() {
        this.codienti=  0;
        this.codiplaz= 0;
        this.coditpla=  0;
        this.natuplaz=  '';
        this.versplaz= 0;
        this.verstpla= 0;
    
    }

}
