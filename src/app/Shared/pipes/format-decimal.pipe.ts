import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDecimal',
})
export class FormatDecimalPipe implements PipeTransform {
  transform(value: number | undefined | null, ...args: number[]): unknown {
    if (value && value!==null) {
        return value.toString().replace('.',',');
    }
    else return '';
  }
}