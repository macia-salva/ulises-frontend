import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Shared/components/home/home.component';
import { AuthGuard } from './Shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./Modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./Modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'rrhh',
    loadChildren: () =>
      import('./Modules/rrhh/rrhh.module').then((m) => m.RrhhModule),
  },
  {
    path: 'carrera',
    loadChildren: () =>
      import('./Modules/carrera/carrera.module').then((m) => m.CarreraModule),
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
