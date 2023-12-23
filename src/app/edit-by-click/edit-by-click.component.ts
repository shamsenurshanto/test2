import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {ShareDataService} from "../Shared/share-data.service";

@Component({
    selector: 'app-edit-by-click',
    templateUrl: './edit-by-click.component.html',
    styleUrl: './edit-by-click.component.css'
})
export class EditByClickComponent implements OnInit {


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
    dataEdit: any;

    constructor(private fb: FormBuilder, private api: ApiService, private ServiceShare: ShareDataService) {
    }

    ngOnInit() {
        // Create form
        this.form = this.fb.group({
            employees: this.fb.array([])
        });
        this.dataEdit = this.ServiceShare.getMessage();
        // Casting AbstractControl as FormArray
        this.employees = this.form.get('employees') as FormArray;

        console.log(this.ServiceShare.getMessage());

        // Add first line
        this.addLine();


    }

    addLine(): void {
        // Add new form in FormArray
        this.employees.push(this.fb.group({firstName: this.dataEdit.firstName, lastName: this.dataEdit.lastName, email: this.dataEdit.email}));
        // Update table

        this.dataSource = this.employees.value;
        console.log(this.dataSource.filteredData);
        console.log(this.dataSource);
        this.objectTOSubmit = this.form.value;
        console.log(this.objectTOSubmit);

    }

    deleteemp() {
        const convertedJson =

            {
                "id": this.dataEdit.id,
                "firstName": this.dataEdit.id.firstName,
                "lastName": this.dataEdit.id.lastName,
                "email": this.dataEdit.id.email,
            };
        console.log(convertedJson);
        if (this.form.valid) {
            this.api.deleteProduct(convertedJson).subscribe({
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

    updateEmp(): void {

        const convertedJson =

            {
                "id": this.dataEdit.id,
                "firstName": this.form.value.employees[0].firstName,
                "lastName": this.form.value.employees[0].lastName,
                "email": this.form.value.employees[0].email,

            }

        ;
        console.log(convertedJson);
        if (this.form.valid) {
            this.api.editProduct(convertedJson).subscribe({
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
