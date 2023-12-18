import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import {BehaviorSubject} from "rxjs";
export interface Element {
  name: string;
  age: number;
}

@Component({
  selector: 'app-dept-employee-list',
  templateUrl: './dept-employee-list.component.html',
  styleUrl: './dept-employee-list.component.css'
})



export class DeptEmployeeListComponent {


  displayedColumns: string[] = ['name', 'age'];
  dataSource = new MatTableDataSource<any>();
  form!: FormGroup;
  data!: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Create form
    this.form = this.fb.group({
      data: this.fb.array([])
    });

    // Casting AbstractControl as FormArray
    this.data = this.form.get('data') as FormArray;

    // Add first line
    this.addLine();
  }

  addLine(): void {
    // Add new form in FormArray
    this.data.push(this.fb.group({ name: [''], age: [] }));
    // Update table
   
    this.dataSource  = this.data.value;
    console.log(this.dataSource.filteredData);
    console.log(this.dataSource);
    console.log(this.form.value.data);
    
  }

}
