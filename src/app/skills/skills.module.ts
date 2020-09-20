import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { MaterialModule } from '../Share/MaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SkillsService } from './skills.service'

@NgModule({
  declarations: [SkillsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SkillsRoutingModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),

  ],
  providers : [SkillsService]
  //entryComponents :[]
})
export class SkillsModule { }
