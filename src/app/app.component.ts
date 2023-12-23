import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {DialogComponent} from './dialog/dialog.component';
import {ApiService} from './services/api.service';
import {log} from 'console';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {map} from "rxjs/operators";
import {of} from "rxjs";
import {EditByClickComponent} from "./edit-by-click/edit-by-click.component";
import {ShareDataService} from "./Shared/share-data.service";


export class deptAndEmployeeInfo {
    "deptName": string;
    "id": string;
    "firstName": string;
    "lastName": string;
    "email": string;

}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',

})

export class AppComponent implements OnInit {

    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dept'];
    selectedOption: string = "";
    dataSource!: MatTableDataSource<any>;
    dataSourceBackedup!: MatTableDataSource<any>;
    dataSourceBackedupNone!: MatTableDataSource<any>;
    departments: deptAndEmployeeInfo[] = [];
    // selectedOption: string="";

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    title = 'test2';

    constructor(public dialogs: MatDialog, private api: ApiService,private SearchService:ShareDataService) {
    }

    ngOnInit(): void {
        this.getAllEmployee();
        // this.dataSourceBackedup = this.dataSource;


    }

    openDialog() {
        this.dialogs.open(DialogComponent, {
            width: '100%',
            height: '700'
        });
    }  //

    openDialogEdit(row: any) {
        this.SearchService.setMessage(row);
        this.dialogs.open(EditByClickComponent, {
            width: '100%',
            height: '700'
        });
    }

    dropdownOptions: string[] = ['CSE', 'HR', 'EEE'];


    selectOption(option: string): void {
        this.selectedOption = option;

        console.log('Selected Option:', this.selectedOption);
        console.log('Selected Option:', this.dataSourceBackedup.filteredData);
        this.dataSourceBackedupNone = new MatTableDataSource<any>();
        const currentData = this.dataSourceBackedupNone.data;

        for (const row of this.departments) {
            console.log(row);
            const flag = 0;
            if (option === row.deptName) {
                currentData.push(row)
                console.log(currentData);
                flag:1;
            }
        }
        if (currentData.length === 0) {
            // this.getAllEmployee();
            this.dataSourceBackedup = new MatTableDataSource();
            this.getAllEmployee();
            return;
        }
        this.dataSourceBackedup.data = currentData;
        console.log(this.dataSourceBackedup.data);
    }

    getRecord(row: any) {
        console.log(row);
    }

    getAllEmployee() {
        this.api.getPost().subscribe({
            next: (res) => {
                console.log(res);
                this.dataSource = new MatTableDataSource(res);
                this.dataSourceBackedup = new MatTableDataSource();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                // this.departments = this.dataSource.filteredData;
                console.log(this.dataSource.filteredData);
                this.departments = [];
                for (let row of this.dataSource.filteredData) {
                    for (let i of row.employees) {
                        console.log(i.email);
                        this.departments.push({
                            "deptName": row.deptName,
                            "id": i.id,
                            "firstName": i.firstName,
                            "lastName": i.lastName,
                            "email": i.email,
                        })
                    }

                }
                console.log(this.departments);

                this.dataSourceBackedup = new MatTableDataSource(this.departments);
                console.log(this.dataSourceBackedup);

            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

