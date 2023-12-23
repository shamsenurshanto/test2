import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
message:any;
  constructor() { }
  setMessage(msg:string){
    this.message=msg;
  }
  getMessage(){
    return this.message;
  }
}
