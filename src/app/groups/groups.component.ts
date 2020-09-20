import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Groups,RightGroups } from '../classes/RightsGroup'
import { RightsConst } from '../classes/Right'
import { GroupService } from './groups.service'
import { ToastrService } from 'ngx-toastr';
import { RightsService } from '../rights/rights.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rights','add','edit','delete'];
  groups  : Array<any> ; 
  rights  : Array<any>; 
  Backup  : Array<any> ; 
  mapRights : Map<number , boolean > = new Map <number , boolean> () ; 
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild('addRight', {static:true}) addRight; 
  @ViewChild('groupModal', {static:true}) groupModal;   
  @ViewChild('editgroupModal', {static:true}) editgroupModal;   

  filterValue;
  name :string =''; 
  currentGroup : number =-1 ; 
  rightId : number =-1 ; 
  requiredGroupName : boolean =false ; 
  requiredRight : boolean = false ; 
  groupName : string ='';
  hideElement: boolean = true;
  selected = [{
    id: 1 , 
    applicationName : 'app1'
  }] ; 
  constructor(private groupService : GroupService , 
    private toastr: ToastrService , 
    private rightsService : RightsService
    )

  { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

  async add(element){
      this.rights = Array<any>(); 
      this.mapRights = new Map<number , boolean > () ; 
      await element.rights.forEach(elt => {
        this.mapRights.set(elt.right.id,true) ; 
     });
      this.Backup.forEach(elt => {
         if (this.mapRights.get(elt.id)===undefined){
            this.rights.push(elt) ; 
          }
         
      });
      this.addRight.show(); 
      this.currentGroup = element['id']; 
    }
    deleteRights(idGroup,idRights){
      if(confirm("Are you sure to delete "+name)) {
        this.groupService.deleteRightFromGroup(idGroup,idRights)
        .subscribe(response=>{
            this.toastr.success('Rights Successfully Deleted','Successfully ! ') ; 
            this.load() ; 

        }   
        ,err=>{
            this.toastr.error('Error Deleting Rights','Error ! ') ; 

        })
      }
    }
    saveGroup(){
        if (this.groupName.length===0)
          this.requiredGroupName = true ; 
        else {
            this.groupService.AddGroup({
              name : this.groupName
            })
            .subscribe(response=>{
              this.toastr.success('GroupRight Successfully added ','Successfully ! ')
              this.groupModal.hide() ; 
              this.groupName = ''; 
              this.load() ; 
  
            },
            err=> {
              this.toastr.error('Error adding new Group ','Error ! ')

            })
        }
    }
    change(event){
      console.log(event)
    }
    delete(id){
      if(confirm("Are you sure to delete "+name)) {
        this.groupService.deleteGroup(id).subscribe(response =>{
          this.toastr.success('Skill deleted Successfully !' , 'Successfully ! ') 
          this.load() ; 

        },
        err=>{
          this.toastr.error ('Error deleting group ','Error ! ')
        })
      }
    }
    edit(element){
        this.name = element.name ;
        this.requiredGroupName=false; 
        this.currentGroup = element.id;
        this.editgroupModal.show() ; 
    }
    ngOnInit() {
      this.load() ; 
    }
    load(){
      this.groupService.getAllGroup().subscribe(response=>{
        this.dataSource = new MatTableDataSource(response); 
        this.dataSource.paginator = this.paginator;
      })
      this.rightsService.getAllRights().subscribe(response=>{
        this.Backup = response; 
 
      })
    }
    choose(v){
        this.selected.push(v);
    } 
    onNavigate(username){
      console.log(`User  Name ${username}`)
    }
    
    filterGroups(value: string) {
       this.dataSource.filter = value;
    }
    addGroup(){
      this.groupModal.show(); 
    }
    saveRights(){
        if (this.rightId===-1)
          this.requiredRight = true ; 
        else {
          this.groupService.AddRightToGroup(this.currentGroup,this.rightId)
          .subscribe(response => {
            this.toastr.success ('Right affected Successfully ','Successfully ! ')
            this.addRight.hide() ;
            this.groupName = '';
            this.rightId =-1;
            this.currentGroup = -1 ; 
            this.load() ; 
          }, 
          err =>{
            this.toastr.error('Error affecting new Rights ','Error ! ')
          }
          )
        }
    }
    saveUpdatingName(){
      if (this.name==='')
        this.requiredGroupName=true;
      else {
        this.groupService.updateName(this.currentGroup,{name : this.name})
        .subscribe(response=>{

         this.toastr.success ('Group updated Successfully ','Successfully ! ')
            this.editgroupModal.hide() ; 
            this.load();  
          }, 
          err =>{
            this.toastr.error('Error updating group ','Error ! ')
          })
      }
    }
    
}
