import { Component, OnInit } from '@angular/core';
import { Router, UrlSegment, ActivatedRoute, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  appear : boolean = false ; 
  url;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }
  
    ngOnInit(): void {
      this.router.events
      .pipe( filter((event: any) => event instanceof NavigationEnd) )
      .subscribe(event => {
        this.url= event.url ; 
        if (this.url.startsWith('/users')|| this.url === '/skills' )
          this.appear = true; 
      });  
    }
  
}
