import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  api = environment.api ; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:  'Bearer '+localStorage.getItem('accessToken')

    })
  }

  constructor(private http : HttpClient) { }
  getAllGroup():Observable<any>{
    return this.http.get(this.api+'groups',this.httpOptions);
}
  AddGroup(group):Observable<any>{
      return this.http.post(this.api+'groups',group,this.httpOptions);
  }
  updateName(id, name) : Observable <any> {
      return this.http.put(this.api+'groups/'+id,name, this.httpOptions)
  }
  deleteRightFromGroup(idGroup,idright) : Observable <any> {
    return this.http.delete(this.api+'groups/delete/'+idGroup+'/'+idright, this.httpOptions)
  }
  AddRightToGroup(idGroup,idright):Observable<any>{
    return this.http.put(this.api+'groups/addRight/'+idGroup+'/'+idright,{},this.httpOptions);
  }
  deleteGroup(idGroup) : Observable <any> {
    return this.http.delete(this.api+'groups/'+idGroup, this.httpOptions)
  }

}
