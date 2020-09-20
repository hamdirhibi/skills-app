import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from '../Services/shared.service'
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';
import { SkillsService } from '../skills/skills.service';
import { GroupService } from '../groups/groups.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username','email','view'];
  users : Array<any> 
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild('addUser', {static:true}) addUser; 
  @ViewChild('editUser', {static:true}) editUser; 
  @ViewChild('managerModal', {static:true}) managerModal; 
  UsersToSelect:  Array<any> ; 
  password : string = '' ; 
  firstName : string =''; 
  lastName : string =''; 
  email : string =''; 
  username : string = ''; 
  filterValue='';
  groups  ; 
  groupe : number = -1; 
  Me ; 
  managerId : number = -1 ; 
  currentUser  : number = -1 ; 
  skill : string ; 
  requiredItems : boolean = false ; 
  requiredmanagerID : boolean = false ; 
  mp : Map<number , string > = new Map <number , string >() ;
  mpOfAdmin : Map<number , boolean > = new Map <number , boolean >() ;

  Role_Admin_Exist : boolean = false ; 
  SecondUser; 
  userSkills : Array<any>  ;
  ready = false; 

  constructor(private usersService : UsersService , 
              private sharedService : SharedService,
              private skillService : SkillsService,
              private groupService : GroupService,
              private toastr : ToastrService
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
    
    editSkillState(id){
      this.skillService.updateState(id,this.mp[id])
      .subscribe(response=>{
      this.toastr.success('User Skill updated Successfully !' , 'Successfully ! ')
      this.load();  

          },
          err=>{
            this.toastr.error ('Error updating User Skill','Error ! ')
          })
        
    }
    delete(id){
      if(confirm("Are you sure to delete "+name)) {
        this.usersService.deleteUser(id).subscribe(response =>{
          this.toastr.success('User deleted Successfully !' , 'Successfully ! ') ; 
          this.addUser.hide() ; 
          this.load() ; 

        },
        err=>{
          this.toastr.error ('Error deleting User ','Error ! ')
        })
      }
    }
    editState(id){

    }
    async edit(element){
      this.email = element['email'] ; 
      this.firstName = element['firstName'] ; 
      this.lastName = element['lastName'] ; 
      this.username = element['username'] ; 
      this.groupe = element.group.name ; 
      this.currentUser = element['id']
      this.requiredItems = false ;
      this.usersService.getSpecificUser(this.currentUser).subscribe(async response=>{
          this.SecondUser = response ; 
          console.log(this.SecondUser)

          if (this.SecondUser.userSkills.length===0)
            this.toastr.warning("user doesn't have any skills")
          else {
          this.editUser.show() ;
          this.mp = new Map<number, string > () ; 
          this.SecondUser.userSkills.forEach( (element) =>{
            this.mp[element.id]=element.status ; 
          })
        }
      })
  }
  updateUser(){

      if (this.groupe === -1 || this.firstName.length===0 || this.lastName.length===0 || this.username.length===0 || this.email.length===0)
      this.requiredItems = true ; 
      else {

        this.requiredItems =false ; 
        this.usersService
          .updateUser({
            firstName : this.firstName,
            lastName :  this. lastName , 
            username : this.username , 
            email : this.email ,
            groupId : this.groupe
          })
          .subscribe(response=>{
            this.toastr.success('User Successfully updated ','Successfully ! ')
            this.addUser.hide() ; 
            this.load() ; 

          },
          err=> {
            this.toastr.error('Error updating  user ','Error ! ')
  
            })
          } 
      }

    saveUser(){
        if (this.groupe === -1 || this.firstName.length===0 || this.lastName.length===0 || this.username.length===0 || this.email.length===0||this.password.length===0)
          this.requiredItems = true ; 
          else {
            this.requiredItems =false ; 
            this.usersService
              .AddUser({
                firstName : this.firstName,
                lastName :  this. lastName , 
                username : this.username , 
                email : this.email ,
                password : this.password , 
                groupId : this.groupe,
                role : 'ROLE_MEMBER'

              })
              .subscribe(response=>{
                this.toastr.success('User Successfully added ','Successfully ! ')
                this.firstName,this.lastName,this.username,this.email,this.username='';
                this.groupe = -1 ;  
                this.load() ; 
                this.addUser.hide() ; 
              },
              err=> {
                this.toastr.error('Error adding  new user ','Error ! ')
      
                })
              } 
      }
    add(){
        this.addUser.show() ;
    }
    managerOpen(user,manager) {
      this.currentUser = user.id;  
      this.UsersToSelect=[];
      this.managerId  =-1 ; 
      if (manager)
        this.managerId = manager.id
      this.usersService.getAllUsers().subscribe(async response=>{

        await response.forEach(async (element ) => {
        
        element['user'].roles.forEach(role => {
            if (role['name']==='ROLE_ADMIN') 
                this.mpOfAdmin.set(element['user'].id,true)
        }); 
        })

       await  response.forEach(async (element ) => {

          

          if (element['user'].id!=user.id&&this.mpOfAdmin.get(element['user'].id)==null)
              this.UsersToSelect.push(element['user']) ; 
        });
    });  

    this.managerModal.show() ; 
    }
    ngOnInit() {
        this.sharedService.Me().subscribe(data=>{
        this.Me = data; 
        
        this.load() ; 
      })
    }
    
    updateManager(){
      if (this.managerId === -1)
        this.requiredmanagerID; 
        else {
        this.usersService.addManager(this.managerId,this.currentUser).subscribe(response=>{
          this.toastr.success('Manager Successfully affected' , 'Successfullt ! ')
          this.load(); 
          this.managerModal.hide() ; 
          this.currentUser = -1 ; 
          this.managerId = -1 ; 

        },err=> {
          this.toastr.error('Error affecting User' , 'Error ! ')

        })
        }
    }
    
    
    async load(){
      this.users=[] ; 

    
     for (let i in this.Me['user'].roles){
        if (this.Me['user'].roles[i].name ==='ROLE_ADMIN')
          this.Role_Admin_Exist = true ; 
        
       }
     if (this.Role_Admin_Exist){
       this.usersService.getAllUsers().subscribe(response=>{
        response.forEach((element ) => {
          if (element['user'].id!=this.Me['user'].id)
              this.users.push(element) ; 
        });
        this.dataSource = new MatTableDataSource(this.users); 
        this.dataSource.paginator = this.paginator;
  
       })
     }
     else {
       
       this.Me['team'].forEach((element ) => {
          if (element.id!=this.Me['user'].id)
              this.users.push(element) ; 
      })
       this.dataSource = new MatTableDataSource(this.users); 
       this.dataSource.paginator = this.paginator;
    }
    this.groupService.getAllGroup().subscribe(response=>{
        this.groups = response ; 
    })
    this.ready = true; 

    }
    onNavigate(username){
    console.log(`User  Name ${username}`)
    }
    
    filterUser (value: string) {
      if (value!='')
      this.dataSource.filter = value;
    }
    
      
  }
