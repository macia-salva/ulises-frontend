import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | undefined, ...args: number[]): unknown {
    let ddFormat: string;
    let mmFormat: string;
    let yyFormat: string;
    let newFormat: string = '';
    
    if (value) {
    let dateTransform = value.toString();
    let type: number = args[0];

    ddFormat = dateTransform.substring(8,10);
    mmFormat = dateTransform.substring(5,7);
    yyFormat = dateTransform.substring(0,4);

    
    if (type === 1) {
      newFormat = ddFormat + mmFormat + yyFormat;
    }
    if (type === 2) {
      newFormat = ddFormat + ' / ' + mmFormat + ' / ' + yyFormat;
    }
    if (type === 3) {
      newFormat = ddFormat + '/' + mmFormat + '/' + yyFormat;
    }
    if (type === 4) {
      newFormat = yyFormat + '-' + mmFormat + '-' + ddFormat;
    }
    }
    return newFormat;
  }

  private needZero(checkNumber: number): string {
    return checkNumber < 10 ? '0' + checkNumber : String(checkNumber);
  }
}
