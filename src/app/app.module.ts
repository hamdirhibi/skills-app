import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Material/navbar/navbar.component';
import { FooterComponent } from './Material/footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardService } from './Services/auth-guard.service';
import { AuthService } from './Services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const   apiUrl: string = environment.api;
const   domain: string = environment.base;



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ErrorPageComponent,
    // ConfirmationDialogComponent,
    
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');
          },
      //  whitelistedDomains: [domain+''],
       // blacklistedRoutes: [apiUrl+'/auth/login']
      }
    }),
  ],
  providers: [AuthGuardService,
              AuthService,
            ],
            
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
