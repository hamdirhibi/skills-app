import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightsRoutingModule } from './rights-routing.module';
import { RightsComponent } from './rights.component';
import { MaterialModule } from '../Share/MaterialModule';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [RightsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RightsRoutingModule,
    MDBBootstrapModule.forRoot(),
  ]
})
export class RightsModule { }
