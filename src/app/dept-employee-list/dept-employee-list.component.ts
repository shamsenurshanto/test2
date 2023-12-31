import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from "rxjs";
import {ApiService} from "../services/api.service";

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


    displayedColumns: string[] = ['firstName', 'lastName', "email"];
    objectTOSubmit: any;
    dataSource = new MatTableDataSource<any>();
    form!: FormGroup;
    employees!: FormArray;
    dropdownOptions: string[] = ['CSE', 'HR', 'EEE'];

    // displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dept'];
    selectedOption: string = "";
    selectedOptionValue: string = "";
    // dataSource!: MatTableDataSource<any>;
    dataSourceBackedup!: MatTableDataSource<any>;
    dataSourceBackedupNone!: MatTableDataSource<any>;

    constructor(private fb: FormBuilder, private api: ApiService) {
    }

    ngOnInit() {
        // Create form
        this.form = this.fb.group({
            employees: this.fb.array([])
        });

        // Casting AbstractControl as FormArray
        this.employees = this.form.get('employees') as FormArray;

        // Add first line
        this.addLine();
    }
    addLine(): void {
        // Add new form in FormArray
        this.employees.push(this.fb.group({firstName: ['json'], lastName: ['pison'], email: ['ab@gmail.com']}));
        // Update table

        this.dataSource = this.employees.value;
        console.log(this.dataSource.filteredData);
        console.log(this.dataSource);
        this.objectTOSubmit = this.form.value;
        console.log(this.objectTOSubmit);

    }

    addProduct(): void {

        const convertedJson =

            {

                "deptCode": this.selectedOptionValue,
                "deptName": this.selectedOption,
                "employees": this.form.value.employees

            }

        ;
        console.log(convertedJson);
        if (this.form.valid) {
            this.api.postProduct(convertedJson).subscribe({
                next: (res) => {
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

    selectOption(option: string): void {
        this.selectedOption = option;
        if (option == "CSE") {
            this.selectedOptionValue = "13";
        }
        if (option == "HR") {
            this.selectedOptionValue = "12";
        }
        if (option == "EEE") {
            this.selectedOptionValue = "11";
        }

        console.log('Selected Option:', this.selectedOption);
        // console.log('Selected Option:', this.dataSourceBackedup.filteredData);
        // this.dataSourceBackedupNone = new MatTableDataSource<any>();
        // const currentData = this.dataSourceBackedupNone.data;
        //
        // for (const departments of this.dataSourceBackedup.filteredData) {
        //     console.log(departments.departments);
        //     const flag = 0;
        //     for (const department of departments.departments) {
        //         console.log(department.deptName);
        //         if (option === department.deptName) {
        //             currentData.push(departments)
        //             console.log(currentData);
        //             flag:1;
        //         }
        //     }
        // }
        // if (currentData.length === 0) {
        //     this.getAllEmployee();
        //     return;
        // }
        // this.dataSource.data = currentData;
        // console.log(this.dataSource.data);
    }




}
