import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api = environment.api ; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization:  'Bearer '+localStorage.getItem('accessToken')

    })
  }

  constructor(private http : HttpClient) { }
  getAllUsers():Observable<any>{
    return this.http.get(this.api+'users',this.httpOptions);
  }
  
  addManager(idManager,idUser):Observable<any>{
    return this.http.put(this.api+'users/addManager/'+idManager+'/'+idUser,{},this.httpOptions);
}

  myTeam():Observable<any>{
    return this.http.get(this.api+'users/myteam',this.httpOptions);
  }

  AddUser(user):Observable<any>{
      return this.http.post(this.api+'users',user,this.httpOptions);
  }
  updateUser(user) : Observable <any> {
      return this.http.put(this.api+'users/updateUser',user, this.httpOptions)
  }
  deleteUser(id) : Observable <any> {
    return this.http.delete(this.api+'users/'+id, this.httpOptions)
  }
  updateFirstName(user) : Observable <any> {
    return this.http.put(this.api+'users/updateFirstName',user, this.httpOptions)
  }
  updateLasttName(user) : Observable <any> {
    return this.http.put(this.api+'users/updateLasttName',user, this.httpOptions)
  }
  updateUsername(user) : Observable <any> {
    return this.http.put(this.api+'users/updateUsername',user, this.httpOptions)
  }
  updateEmail(user) : Observable <any> {
    return this.http.put(this.api+'users/updateEmail',user, this.httpOptions)
  }
  getSpecificUser(id):Observable<any>{
    return this.http.get(this.api+'users/'+id,this.httpOptions);
  }

} 
