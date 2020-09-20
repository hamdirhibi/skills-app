import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Skills } from '../classes/Skill';
import { SkillsService } from './skills.service'
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../Services/shared.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status','level','delete'];
  skills  ; 
  requiredLevel : boolean = false ; 
  level : string = '' ; 
  Me ; 
  show : boolean = true ; 
  name : string  ='' ; 
  skillId : number = -1 ; 
  required : boolean =false ; 
  myControl = new FormControl();
  //options all app skills exist except my skills  
  options : string []=[]; 
  filteredOptions: Observable<string[]>;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild('basicModal', {static:true}) basicModal; 
  mapSkills : Map <string , number > = new Map <string , number > () ;
  mapofmyskills : Map <number , boolean > = new Map <number , boolean> () ; 
 
  filterValue;
  choice : number  =-1; 
  Role_Admin_Exist : boolean = false ; 
  constructor(private SkillsService : SkillsService,
  private toastr: ToastrService,
  private sharedService: SharedService)
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
        this.SkillsService.deleteSkill(id).subscribe(response =>{
          this.toastr.success('Skill deleted Successfully !' , 'Successfully ! ') ;
          this.load() ; 
        },
        err=>{
          this.toastr.error ('Error deleting Skill ','Error ! ')
        })
      }
    }
  
    _filter(value: string): string[] {
      if (value.length>0) {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
      }
    }
  
    ngOnInit() {
      this.load();  
    }

    async load() {
          this.options = []
          this.sharedService.Me().subscribe(async response=>{
            this.Me = await response['user'] ; 

            this.Me.userSkills.forEach(element => {
              this.mapofmyskills.set(element.skills.id,true)  ;  
          });
          this.Me.roles.forEach((element,index) => {
            if (this.Me.roles[index].name ==='ROLE_ADMIN')
              this.Role_Admin_Exist = true ; 
          })
          if (!this.Role_Admin_Exist){

            this.dataSource = new MatTableDataSource(this.Me.userSkills); 
            this.dataSource.paginator = this.paginator;
  
          }
            this.SkillsService.getAll()
            .subscribe(response2 =>{
              console.log(response2)
              if (this.Role_Admin_Exist) {
              this.Me.userSkills = response2 ;
              this.dataSource = new MatTableDataSource(this.Me.userSkills); 
              this.dataSource.paginator = this.paginator;
              }
              response2.forEach(element => {
                  this.mapSkills.set(element.name , element.id)  ;  
                  if(this.mapofmyskills.get(element.id)===undefined){
                    this.options.push(element.name) ;    
                  }
              });
              this.filteredOptions = this.myControl.valueChanges
              .pipe(
                
                map(value => this._filter(value))
              );
              })
              console.log(this.Me.userSkills)

      })
  

    }
    showModdal(){
      
    }
    save() {

      if (this.name.length===0){
        this.required=true ; 
        }
      if (this.level.length===0)
        {
          this.requiredLevel = true ;     
        }
      else if (this.options.indexOf(this.name) === -1){
           console.log('new skills ')
            //add to specific user
            if (this.Role_Admin_Exist){ 
            console.log('admin')
            this.SkillsService.Addskills({name : this.name , level : this.level}).subscribe(rep1=>{
                this.toastr.success('Skill Successfully added ' , 'Successfully ! ');
                this.load() ; 
                this.name='';
                this.basicModal.hide() ;   
                

            },err=>{
              this.toastr.error('Error adding new Skill   ! ','Error ! ' );
            })
          }
          else {
            this.SkillsService.assignSkills({name : this.name , id: this.Me.id, level : this.level}).subscribe(rep1=>{
              this.toastr.success('Skill Successfully added ' , 'Successfully ! ');
              this.basicModal.hide() ;   
              this.load() ; 
              this.name='';

          },err=>{
            this.toastr.error('Error adding new Skill   ! ','Error ! ' );
          })
          }
      }
      else if  (this.options.indexOf(this.name) > -1) {
        console.log('skills exist ')

        if (this.Role_Admin_Exist){ 
          console.log('admin')

          this.basicModal.hide() ;   
          this.name='';
        }
        else {
          console.log('not admin')
          console.log(this.mapSkills.get(this.name))
          this.SkillsService.assignSkills({name : this.name , id: this.mapSkills.get(this.name), level : this.level}).subscribe(rep1=>{
            this.toastr.success('Skill Successfully added ' , 'Successfully ! ');
            this.basicModal.hide() ;   
            this.load() ; 

            this.name='';
        },err=>{
          this.toastr.error('Error adding new Skill   ! ','Error ! ' );
        })
        } 
        }
        this.name='';

    }
    add(){
      this.basicModal.show(); 
    }

    onNavigate(username){

    
    console.log(`User  Name ${username}`)
    }
  
  filterRights(value: string) {
    this.dataSource.filter = value;
    }
    
}