import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule  } from '../Share/MaterialModule';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),

  ],
  providers: [UsersService]
})
export class UsersModule { }
