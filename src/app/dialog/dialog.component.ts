import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

  productForm !:FormGroup;
  constructor(private formbuilder : FormBuilder, private api :ApiService){}
  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
       dept:['',Validators.required],
    });
   
  }
  addProduct():void{
    
    const convertedJson = {
      "firstName": this.productForm.value.firstName,
      "lastName": this.productForm.value.lastName,
      "email": this.productForm.value.email,
      "departments": [
        {
          "deptName": this.productForm.value.dept
        }
      ]
    };
    console.log(convertedJson);
    if(this.productForm.valid){
      this.api.postProduct(convertedJson).subscribe({
        next:(res)=>{
          console.log(res);
          alert("success added");
        
        },
        error(err) {
          alert("did not added");
          console.log(err);
        },
      })
      
    }
  }

}
