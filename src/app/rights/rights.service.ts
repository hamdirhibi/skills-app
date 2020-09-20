import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  api = environment.api ; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:  'Bearer '+localStorage.getItem('accessToken')

    })
  }

  constructor(private http : HttpClient) { }
  getAllRights():Observable<any>{
    return this.http.get(this.api+'rights',this.httpOptions);
  }
  AddRight(ritght):Observable<any>{
      return this.http.post(this.api+'rights',ritght,this.httpOptions);
  }
  updateName(id, name) : Observable <any> {
      return this.http.put(this.api+'rights/'+id,name, this.httpOptions)
  }
  deleteRight(idright) : Observable <any> {
    return this.http.delete(this.api+'rights/'+idright, this.httpOptions)
  }

}
