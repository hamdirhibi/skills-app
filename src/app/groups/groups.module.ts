import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { MaterialModule } from '../Share/MaterialModule';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    GroupsRoutingModule,
    MDBBootstrapModule.forRoot(),

  ]
})
export class GroupsModule { }
