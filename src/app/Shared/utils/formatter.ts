export function formatTime(time: number): string {
  if (time < 10) return '0' + time;
  else return time.toString();
}

export function formatSqlDate(dateTransform: string): string {
  let newFormat: string = '';

  if (dateTransform !== '') {
    let ddFormat: string;
    let mmFormat: string;
    let yyFormat: string;

    
    ddFormat = dateTransform.substring(0, 2);
    mmFormat = dateTransform.substring(3, 5);
    yyFormat = dateTransform.substring(6, 10);

    newFormat = yyFormat + '-' + mmFormat + '-' + ddFormat;

  }
  return newFormat;
}
