import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  api = environment.api ; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:  'Bearer '+localStorage.getItem('accessToken')

    })
  }

  constructor(private http : HttpClient) { }
  getAll():Observable<any>{
    return this.http.get(this.api+'skills/',this.httpOptions);
  }


  Addskills(skills):Observable<any>{
      return this.http.post(this.api+'skills',skills,this.httpOptions);
  }
  assignSkills(skills):Observable<any>{
    return this.http.post(this.api+'skills/assign',skills,this.httpOptions);
}
  updateState(id, state) : Observable <any> {
      return this.http.put(this.api+'skills/updateStatus/'+id,{status : state}, this.httpOptions)
  }
  deleteSkill(id) : Observable <any> {
    return this.http.delete(this.api+'skills/'+id, this.httpOptions)
  }
  editLevel(id,level){
    return this.http.put(this.api+'skills/updateLevel/'+id,{level : level}, this.httpOptions)
  }
}
