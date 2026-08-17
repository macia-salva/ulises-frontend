import { AuthDTO } from "src/app/Modules/auth/models/auth.dto";
import { OpcioRoleDTO } from "src/app/Modules/auth/models/opciorole.dto";

export function checkAllowedOption(auth: AuthDTO, option: string): boolean {
    return filterOption(auth, option).length > 0;
  }

export function checkAllowedAction(auth: AuthDTO, option: string, action: string): boolean {
    let filteredOptions: OpcioRoleDTO[] = filterOption(auth, option);
    if (filteredOptions.length > 0) {
      if (action === 'SELECT') return checkSelectAction(filteredOptions[0]);
      if (action === 'INSERT') return checkInsertAction(filteredOptions[0]);
      if (action === 'UPDATE') return checkUpdateAction(filteredOptions[0]);
      if (action === 'DELETE') return checkDeleteAction(filteredOptions[0]);
    }
    return false;
  }

  function checkSelectAction(opc:OpcioRoleDTO):boolean {
    return opc.swselect;
}


  function checkInsertAction(opc:OpcioRoleDTO):boolean {
      return opc.swinsert;
  }

  function checkUpdateAction(opc:OpcioRoleDTO):boolean {
    return opc.swupdate;
}
function checkDeleteAction(opc:OpcioRoleDTO):boolean {
    return opc.swdelete;
}


  function filterOption(auth: AuthDTO, option: string): OpcioRoleDTO[]   {
    let allowedOptions = auth.opcions;
/*    console.log('OPcio:' + option);
    allowedOptions.forEach((opcioRole: OpcioRoleDTO) => {
      console.log(opcioRole.mnOpcio.opcio);
    });*/
    if (allowedOptions) {
      return allowedOptions.filter((opcioRole: OpcioRoleDTO) => {
        return opcioRole.mnOpcio.opcio === option;
      });
    } else return [];
  }