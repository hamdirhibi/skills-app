import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RightsService } from '../rights/rights.service';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-myrighs',
  templateUrl: './myrighs.component.html',
  styleUrls: ['./myrighs.component.scss']
})
export class MyrighsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'applicationName','hostName','action'];
  rights = []  ; 
  show : boolean = true ; 
  groups  = [] ; 
  rightName : string = '';
  hostname : string = ''; 
  groupe:number=-1;
  currentRights : number = -1 ; 
  requiredRight : boolean = false;  
  token = localStorage.getItem('accessToken');
  dataSource = new MatTableDataSource(this.rights);
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild('addRight', {static:true}) addRight; 
  @ViewChild('editRight', {static:true}) editRight; 

  filterValue:string ='';
  constructor(
    private toastr: ToastrService,
    private router : Router,
    private sharedService : SharedService
    ) 

  { }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
    AddRights(){
      this.show = false; 
    }
    go(element){
     // this.router.nabigateByUrl(element.hostName+'/'+localStorage.getItem('accessToken'))
    }
    
    ngOnInit() {
      this.load(); 
    }
    load(){
      this.sharedService.Me().subscribe(async response=>{
        response['user']['group']['rights'].forEach(element => {
            this.rights.push(element.right)
        });
        this.dataSource = new MatTableDataSource(this.rights); 
        this.dataSource.paginator = this.paginator;
      },
      err=>{
        this.toastr.error('Error getting rights lists ', 'Error  ! ')
      })
    }
    
    
  onNavigate(username){
  console.log(`User  Name ${username}`)
  }
  
  filterRights() {
 
    this.dataSource.filter = this.filterValue;
  }
    
}
