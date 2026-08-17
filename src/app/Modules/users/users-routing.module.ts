import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Shared/guards/auth.guard';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [AuthGuard],
    data: {
      option: 'USUARI',
    },
  },
  {
    path: 'user-form/:kusuari',
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: {
      option: 'USUARI',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
