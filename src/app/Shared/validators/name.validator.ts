import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { getTpDocument } from './document.validator';

export const nameRequiredValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const isJuridica: boolean =
    getTpDocument(control.get('document')?.value.toUpperCase()) === 'CIF';
  const nom = control.get('nom');
  const nomComercial = control.get('dencomerc');
  const llinatge1 = control.get('llinatge1');
  return (!isJuridica &&
    nom &&
    llinatge1 &&
    nom.value === '' &&
    llinatge1.value === '') ||
    (isJuridica && nomComercial && nomComercial.value === '')
    ? { nameRequired: true }
    : null;
};

export const nameDenunciantRequiredValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const enabledDenunciant = control.parent?.get('enableDenunciant');
  if (enabledDenunciant && !enabledDenunciant.value) return null;
  else return nameRequiredValidator(control);
};
