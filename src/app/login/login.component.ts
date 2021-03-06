import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string ='' ; 
  password : string =''; 

  constructor(private router : Router,
    private toastr: ToastrService,
    private loginService : LoginService
    ) { }

  ngOnInit(): void {

  }

  signIn() {
    if (  this.username  ===''  ||  this.password ==='')
      this.showRequiredWarning()
    else {
      this.loginService.signIn({ username : this.username , password : this.password }).subscribe(async data=>{
        console.log(data)
        await localStorage.setItem('accessToken',data['accessToken']);
        await localStorage.setItem('roles',data['roles'][0]);
        window.location.replace('/skills');
      },err =>{
        this.showUnauthetificateError() ; 
      })
    }
    //this.router.navigate(['/users']); 
  }
  showUnauthetificateError() {
    this.toastr.error('invalid email or password !', 'Error !');
  }
  showRequiredWarning() {
    this.toastr.warning('username and password are None empty  !', 'Warning !');
  }
  

}
