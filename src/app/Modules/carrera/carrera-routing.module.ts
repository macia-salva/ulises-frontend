import { RouterModule, Routes } from "@angular/router";
import { ConvocatoriaListComponent } from "./components/convocatoria-list/convocatoria-list.component";
import { NgModule } from "@angular/core";
import { ParticipacioListComponent } from "./components/participacio-list/participacio-list.component";
import { ParticipacioComponent } from "./components/participacio/participacio.component";
import { NovaParticipacioComponent } from "./components/nova-participacio/nova-participacio.component";
import { NovaConvocatoriaComponent } from "./components/nova-convocatoria/nova-convocatoria.component";

const routes: Routes = [
  {
    path: 'convocatoria-list',
    component: ConvocatoriaListComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
  {
    path: 'participacio-list',
    component: ParticipacioListComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
  {
    path: 'participacio/:accio',
    component: ParticipacioComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
  {
    path: 'nova-participacio',
    component: NovaParticipacioComponent,
//    canActivate: [AuthGuard],
    data: {
      option: 'RRHH',
    },
  },
  {
    path: 'nova-convocatoria',
    component: NovaConvocatoriaComponent,
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
export class CarreraRoutingModule {}