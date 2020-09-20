import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';
import {ProfilService} from './profil.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  Me  ; 
  firstName : string =''; 
  lastName  : string =''; 
  email : string =''; 
  username  : string =''; 
  requiredFirstName : boolean = false ; 
  requiredlastName: boolean = false ; 
  requiredemail : boolean = false ; 
  requiredusername : boolean = false ; 
  
  constructor(private sharedService : SharedService,
            private profilService : ProfilService,
            private toastr : ToastrService
    ) { }

  ngOnInit(): void {
    this.sharedService.Me().subscribe(response=>{
      this.Me = response; 
    })
  }
  updateFirstName() {
    if (this.Me.user.firstName.length===0)
    this.requiredFirstName = true ; 
    else {

      this.requiredFirstName =false ; 
      this.profilService
        .updateUser(this.Me.user)
        .subscribe(response=>{
          this.toastr.success('First Name  Successfully updated ','Successfully ! ')
        },
        err=> {
          this.toastr.error('Error updating  First name ','Error ! ')

          })
        } 
}
  updateLastName(){
    if (this.Me.user.lastName.length===0)
    this.requiredlastName = true ; 
    else {

      this.requiredlastName =false ; 
      this.profilService
      .updateUser(this.Me.user)
      .subscribe(response=>{
          this.toastr.success('Last Name  Successfully updated ','Successfully ! ')
        },
        err=> {
          this.toastr.error('Error updating  Last Name ','Error ! ')

          })
        } 

  }
  // updateUsername(){
  //   if (this.Me.username.length===0)
  //      this.requiredusername = true ; 
  //   else {

  //     this.requiredusername =false ; 
  //     this.profilService
  //       .updateUsername(this.lastName)
  //       .subscribe(response=>{
  //         this.toastr.show('Username  Successfully updated ','Successfully ! ')
  //       },
  //       err=> {
  //         this.toastr.error('Error updating  Username ','Error ! ')

  //         })
  //       } 

  // }
  updateEmail(){
    if (this.Me.user.email.length===0)
       this.requiredemail = true ; 
    else {

      this.requiredemail =false ; 
      this.profilService
      .updateUser(this.Me.user)
      .subscribe(response=>{
          this.toastr.success('Email Successfully updated','Successfully ! ')
        },
        err=> {
          this.toastr.error('Error updating  Email ','Error ! ')
          })
        } 
  }

}
