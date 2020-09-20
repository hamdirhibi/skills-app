import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuardService } from './Services/auth-guard.service'

const routes: Routes = [

  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)  ,canActivate: [AuthGuardService] 
}, 
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)  ,canActivate: [AuthGuardService] },
  { path: 'users/:id', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)  },

  { path: '404', component: ErrorPageComponent},
  // { path: 'rights', loadChildren: () => import('./rights/rights.module').then(m => m.RightsModule)  ,canActivate: [AuthGuardService] },
  // { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)  ,canActivate: [AuthGuardService] },
  { path: 'skills', loadChildren: () => import('./skills/skills.module').then(m => m.SkillsModule)  ,canActivate: [AuthGuardService] },

  // { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule)  ,canActivate: [AuthGuardService] },

  // { path: 'myrights', loadChildren: () => import('./myrighs/myrighs.module').then(m => m.MyrighsModule)  ,canActivate: [AuthGuardService] },
  { path: '**', component: ErrorPageComponent}
]
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
