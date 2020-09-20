import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyrighsRoutingModule } from './myrighs-routing.module';
import { MyrighsComponent } from './myrighs.component';
import { MaterialModule } from '../Share/MaterialModule';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [MyrighsComponent],
  imports: [
    MyrighsRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),

  ]
})
export class MyrighsModule { }
