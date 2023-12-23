import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,) { }
  postProduct(data:any){

    console.log(data);


    return this.http.post<any>("http://localhost:8080/api/v1/add",data);
  }

  editProduct(data:any){

    console.log(data);


    return this.http.put<any>("http://localhost:8080/api/v1/updateEmp",data);
  }

  getPost(){
    return this.http.get<any>("http://localhost:8080/api/v1/name");
  }
}
