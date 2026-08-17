import { CpTitolDTO } from "./cptitol.dto";

export interface CpTitolAportatDTO {
    ktitolaportat : number,
    ktitol: number,
    titol : CpTitolDTO,
    punts: number,
    swseleccionat: string,
    strconv:       string;
}