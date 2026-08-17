import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const repeatPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const repeatpassword = control.get('repeatpassword');
  return password && repeatpassword && password.value !== repeatpassword.value
    ? { passwordRepeated: true }
    : null;
};

export const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#-_\$%\^&\*]).{8,16}$/;
