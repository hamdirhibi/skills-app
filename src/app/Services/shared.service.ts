import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  api = environment.api ; 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:  'Bearer '+localStorage.getItem('accessToken')

    })
  }

  constructor(private http : HttpClient) { }

  Me():Observable<any>{
      return this.http.get(this.api+'users/me',this.httpOptions);
  }}
