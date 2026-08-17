import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Shared/guards/auth.guard';
import { PersonalListComponent } from './components/personal-list/personal-list.component';
import { PersonalComponent } from './components/personal/personal.component';
import { OcupaciollocFormComponent } from './components/ocupaciolloc-form/ocupaciolloc-form.component';
import { OcupacioplazFormComponent } from './components/ocupacioplaz-form/ocupacioplaz-form.component';

const routes: Routes = [
  {
    path: 'personal-list',
    component: PersonalListComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
  {
    path: 'personal',
    component: PersonalComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
  {
    path: 'ocupaciolloc/:accio',
    component: OcupaciollocFormComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
  {
    path: 'ocupacioplaza/:accio',
    component: OcupacioplazFormComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RRHHRoutingModule {}
