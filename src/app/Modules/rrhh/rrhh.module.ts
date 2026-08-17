import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalListComponent } from './components/personal-list/personal-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { RRHHRoutingModule } from './rrhh-routing.module';
import { PersonalComponent } from './components/personal/personal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { OcupaciollocFormComponent } from './components/ocupaciolloc-form/ocupaciolloc-form.component';
import { OcupacioplazFormComponent } from './components/ocupacioplaz-form/ocupacioplaz-form.component';



@NgModule({
  declarations: [
    PersonalListComponent,
    PersonalComponent,
    OcupaciollocFormComponent,
    OcupacioplazFormComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
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
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    RRHHRoutingModule
  ]
})
export class RrhhModule { }
