import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const documentFormatValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const document: string = control.value.toUpperCase();
  if (!document || document === '') return null;
  let tpdocument = getTpDocument(document);
  if (tpdocument === 'NIF') return checkNIF(document);
  if (tpdocument === 'NIE') return checkNIE(document);
  if (tpdocument === 'CIF') return checkCIF(document);
  return { formatError: true };
};

export const documentRequiredValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const document = control.get('document');
  const docval: string =!document?'':document.value;
  const passaport = control.get('passaport');
  const passval: string =!passaport?'':passaport.value;
  const motiuiden=control.get('motiuiden');
  const idenval: string =!motiuiden?'':motiuiden.value;
  const motiunoiden=control.get('motiunoiden');
  const noidenval: string =!motiunoiden?'':motiunoiden.value;
  if (noidenval==='' && (idenval==='3' || idenval==='4')) return { motiuRequired: true };
  if (idenval==='3' || idenval==='4') return null;
  if (docval === '' &&  passval === '') return { documentRequired: true }
  else return null;
};

export const documentDenunciantRequiredValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const enabledDenunciant = control.parent?.get('enableDenunciant');
  if (enabledDenunciant && !enabledDenunciant.value) return null;
  else return documentRequiredValidator(control);
};

function checkNIF(document: string): ValidationErrors | null {
  if (nifRegex.test(document)) {
    const endletter = letterFromDocument(document);
    if (document.charAt(document.length - 1) !== endletter) {
      return { badLetterError: true };
    } else return null;
  } else {
    return { nifFormatError: true };
  }
}

function checkNIE(document: string): ValidationErrors | null {
  //El format del NIE és: (X/Y/Z)9999999L
  if (nieRegex.test(document)) {
    const firsLetter = document.charAt(0);
    document =
      firsLetter === 'Y' ? '1' : (firsLetter === 'Z' ? '2' : '') + document;
    const endletter = letterFromDocument(document);
    if (document.charAt(document.length - 1) !== endletter) {
      return { badLetterError: true };
    } else return null;
  } else {
    return { nieFormatError: true };
  }
}

function checkCIF(document: string): ValidationErrors | null {
  //El format del CIF és: (A/B/E/G/F/H)99999999 o bé (N/P/Q/S/W)9999999L
  if (cifRegex.test(document)) {    
    const endletter = digitFromDocument(document);
    if (document.charAt(document.length - 1) !== endletter) {
      return { badLetterError: true };
    } else return null;
  } 
  if (newcifRegex.test(document)) {
    return null;
  }
  else {
    return { cifFormatError: true };
  }
}

export function getTpDocument(document: string): string {
  if (/^[0-9]/.test(document)) return 'NIF';
  if (/^[ABCDEFGHJUVNPQRSW]/.test(document)) return 'CIF';
  if (/^[XYZ]/.test(document)) return 'NIE';
  return '';
}

export function digitFromDocument(doc:string): string {
  let r: string;

  let primeraLletra: string = doc.charAt(0);

  let codNum: string = doc.substring(1,8);
  
  let A: number = 0; 	// POSICIONS PARELLES
  for (let i: number=2;i<doc.length-1;i+=2) {
    let n: number = Number(doc.charAt(i));
    A += n;
  }
  let B = 0;	// POSICIONS IMPARELLES 
  for (let i: number=1;i<doc.length-1;i+=2) {
    let c:number = Number(doc.charAt(i));
    let n: number = c*2;
    if (n>=10) {
      n = n % 10 + 1;
      // if (n==10) n = 1; // Aquest cas no es pot donar mai!! Hauria d'esser que c*2 = 19, cosa impossible!
    }
    B += n;
  }			
  
  let C:number = A + B;
  
  let darrerdigit: number = C % 10;
  if (darrerdigit!=0) darrerdigit = 10 - darrerdigit;

  r = darrerdigit.toString();
  return r;

}

export function letterFromDocument(document: string) {
  const lletresCalcul = [
    'T',
    'R',
    'W',
    'A',
    'G',
    'M',
    'Y',
    'F',
    'P',
    'D',
    'X',
    'B',
    'N',
    'J',
    'Z',
    'S',
    'Q',
    'V',
    'H',
    'L',
    'C',
    'K',
    'E',
  ];
  let num = Number(plainDocument(document));
  return lletresCalcul[num % 23];
}

function plainDocument(document: string): string {
  let eliminaZeros: boolean = true;
  let newDocument: string = '';
  for (let i = 0; i < document.length; i++) {
    const currentLetter = document.charAt(i);
    if (
      /^[1-9]$/.test(currentLetter) ||
      (currentLetter === '0' && !eliminaZeros)
    ) {
      newDocument += currentLetter;
      eliminaZeros = false;
    }
  }
  return newDocument;
}

export const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
export const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
export const cifRegex = /^[ABCDEFGHJUV][0-9]{8}$/i;
export const newcifRegex = /^[NPQRSW][0-9]{7}[A-Z]$/i;
