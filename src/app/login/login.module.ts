import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginService } from  './login.service' ; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
