import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RightsConst } from '../classes/Right'
import { Groups } from '../classes/RightsGroup';
import { RightsService  } from './rights.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.scss']
})
export class RightsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'applicationName','hostName','edit','delete'];
  rights = []  ; 
  show : boolean = true ; 
  groups  = Groups ; 
  rightName : string = '';
  hostname : string = ''; 
  groupe:number=-1;
  currentRights : number = -1 ; 
  requiredRight : boolean = false;  
  dataSource = new MatTableDataSource(this.rights);
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild('addRight', {static:true}) addRight; 
  @ViewChild('editRight', {static:true}) editRight; 

  filterValue;
  constructor(private rightService : RightsService , 
    private toastr: ToastrService)

  { }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
    AddRights(){
      this.show = false; 
    }
    delete(id){
      if(confirm("Are you sure to delete "+name)) {
        this.rightService.deleteRight(id).subscribe(response =>{
          this.toastr.success('Right deleted Successfully !' , 'Successfully ! ')
          this.load() ; 

        },
        err=>{
          this.toastr.error ('Error deleting Right ','Error ! ')
        })
      }
    }
    edit(element){
        this.rightName = element['applicationName'] ; 
        this.requiredRight = false ; 
        this.currentRights = element['id'] ; 
        this.hostname = element['hostName'] ; 
        
        this.editRight.show() ; 
    }
    ngOnInit() {
      this.load(); 
    }
    load(){
      this.rightService.getAllRights().subscribe(response=>{
        this.dataSource = new MatTableDataSource(response); 
        this.dataSource.paginator = this.paginator;
      },
      err=>{
        this.toastr.error('Error getting rights lists ', 'Error  ! ')
      })
    }
    editRights(){
      if (this.rightName === '' || this.hostname === '')
      this.requiredRight = true ; 
    else {
        this.requiredRight =false ; 
      this.rightService
        .updateName(this.currentRights,{applicationName : this.rightName , hostName : this.hostname})
        .subscribe(response=>{
          this.toastr.success('Right Successfully updated ','Successfully ! ')
          this.editRight.hide() ; 
          this.load() ; 
          this.rightName='';
          this.hostname ='';
          this.currentRights = -1 ; 
        },
        err=> {
          this.toastr.error('Error updating  Rights ','Error ! ')

          })
        } 
    }

    saveRight() {
      if (this.hostname.length === 0 ||  this.rightName === '')
        this.requiredRight = true ; 
      else {
          this.requiredRight =false ; 
          this.rightService.AddRight({
            applicationName : this.rightName,
            hostName : this.hostname
          })
          .subscribe(response=>{
            this.toastr.success('Right Successfully added ','Successfully ! ')
            this.addRight.hide() ; 
            this.load() ;
            this.rightName='';
            this.hostname ='';
          },
          err=> {
            this.toastr.error('Error adding new Rights ','Error ! ')

          })
      }
  }
    
    add(){
      this.addRight.show(); 
    }
    
  onNavigate(username){
  console.log(`User  Name ${username}`)
  }
  
  filterRights(value: string) {
    this.dataSource.filter = value;
    }
    
}
