import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyrighsComponent } from './myrighs.component';

const routes: Routes = [{ path: '', component: MyrighsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyrighsRoutingModule { }
