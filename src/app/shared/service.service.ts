import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  addUser(data:any):Observable<any>{
   return this.http.post("http://localhost:3000/user",data);
  }

  getAllUser():Observable<any>{
   return this.http.get("http://localhost:3000/user");
  }

  deleteUser(id:any):Observable<any>{
   return this.http.delete(`http://localhost:3000/user/${id}`);
  }
  updateUser(id:number, data:any):Observable<any>{
   return this.http.put(`http://localhost:3000/user/${id}`,data);
  }

 
}
