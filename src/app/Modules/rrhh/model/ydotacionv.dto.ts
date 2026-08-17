export class Ydotacionv {
    centcos1:      string;
    centcos2:      string;
    centcos3:      string;
    centcos4:      string;
    centcos5:      string;
    centtra1:      string;
    centtra2:      string;
    centtra3:      string;
    centtra4:      string;
    centtra5:      string;
    coddotsu:      number;
    codentsu:      number;
    codiedif:      number;
    codiesco:      string;
    codizona:      number;
    codptosu:      number;
    esrespon:      string;
    extingui:      string;
    fechmodi:      Date | null;
    finivers:      Date | null;
    ffinvers:      Date | null;
    horamodi:      string;
    id:            YdotacionvID;
    porcjorn:      number;
    presuDiadesde: number;
    presuDiafin:   number;
    presuMesdesde: number;
    presuMesfin:   number;
    tcompl:        string;
    
    constructor() {
        this.centcos1=      '';
        this.centcos2=      '';
        this.centcos3=      '';
        this.centcos4=      '';
        this.centcos5=      '';
        this.centtra1=      '';
        this.centtra2=      '';
        this.centtra3=      '';
        this.centtra4=      '';
        this.centtra5=      '';
        this.coddotsu=      0;
        this.codentsu=      0;
        this.codiedif=      0;
        this.codiesco=      '';
        this.codizona=      0;
        this.codptosu=      0;
        this.esrespon=      '';
        this.extingui=      '';
        this.fechmodi=      null;
        this.finivers=      null;
        this.ffinvers=      null;
        this.horamodi=      '';
        this.id=            new YdotacionvID();
        this.porcjorn=      0;
        this.presuDiadesde= 0;
        this.presuDiafin=   0;
        this.presuMesdesde= 0;
        this.presuMesfin=   0;
        this.tcompl=        '';
    }
}

export class YdotacionvID {
    codienti: number;
    codipues: number;
    coditrpt: string;
    numedota: number;
    versdota: number;
    
    constructor() {
        this.codienti= 0;
        this.codipues= 0;
        this.coditrpt= '';
        this.numedota= 0;
        this.versdota= 0;
    }
}
