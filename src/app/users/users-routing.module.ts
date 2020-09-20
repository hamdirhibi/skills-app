import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes: Routes = [{ path: '', component: UsersComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),

  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
