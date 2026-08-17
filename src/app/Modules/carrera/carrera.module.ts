import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvocatoriaListComponent } from './components/convocatoria-list/convocatoria-list.component';
import { CarreraRoutingModule } from './carrera-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ParticipacioComponent } from './components/participacio/participacio.component';
import { ParticipacioListComponent } from './components/participacio-list/participacio-list.component';
import { NovaParticipacioComponent } from './components/nova-participacio/nova-participacio.component';
import { NovaConvocatoriaComponent } from './components/nova-convocatoria/nova-convocatoria.component';



@NgModule({
  declarations: [
    ConvocatoriaListComponent,
    ParticipacioComponent,
    ParticipacioListComponent,
    NovaParticipacioComponent,
    NovaConvocatoriaComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    LayoutModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    CarreraRoutingModule
  ]
})
export class CarreraModule { }
