import { NgModule } from '@angular/core';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatDecimalPipe } from './pipes/format-decimal.pipe';

@NgModule({
    imports: [        
    ],
    declarations: [
        FormatDatePipe,
        FormatDecimalPipe
    ],
    exports: [
        FormatDatePipe,
        FormatDecimalPipe
    ]
            
})

export class SharedModule {}    