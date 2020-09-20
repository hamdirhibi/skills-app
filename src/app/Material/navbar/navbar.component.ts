import { Component, OnInit } from '@angular/core';
import { Router, UrlSegment, ActivatedRoute, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import { UsersService } from 'src/app/users/users.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appear : boolean = false ; 
  url;
  Role_ADMIN_Exist: boolean =false  ;  
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService : SharedService
    ) { }
  
    ngOnInit(): void {
      this.sharedService.Me().subscribe(data=>{
        for (let i in data['user'].roles){
            if (data['user'].roles[i].name ==='ROLE_ADMIN')
              this.Role_ADMIN_Exist = true ; 
        }
      })
      this.router.events
      .pipe( filter((event: any) => event instanceof NavigationEnd) )
      .subscribe(event => {
        this.url= event.url ; 
        if (this.url.startsWith('/users')|| this.url === '/skills' )
          this.appear = true; 
      });  
      
    }

    logout(){
    localStorage.removeItem('accessToken')  
      window.location.replace('/login');
     }
  

}
