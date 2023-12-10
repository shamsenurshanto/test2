import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from './dialog/dialog.component'; 
import { ApiService } from './services/api.service';
import { log } from 'console';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})

export class AppComponent implements OnInit {
   
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dept'];
  selectedOption: string="";
  dataSource!: MatTableDataSource<any>;
  dataSourceBackedup!: MatTableDataSource<any>;
  dataSourceBackedupNone!: MatTableDataSource<any>;
  // selectedOption: string="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'test2';
  constructor(public dialogs: MatDialog, private api : ApiService) {}
  ngOnInit(): void {
    this.getAllEmployee();
    // this.dataSourceBackedup = this.dataSource;
   

  }

  openDialog() {
     this.dialogs.open(DialogComponent,{
      width:'100%',
      height:'700'
     }); 
  }  // 
 
  dropdownOptions: string[] = ['cse', 'HR', 'EEE'];
 

  selectOption(option: string): void {
    this.selectedOption = option;
  
    console.log('Selected Option:', this.selectedOption);
    console.log('Selected Option:', this.dataSourceBackedup.filteredData);
    this.dataSourceBackedupNone = new MatTableDataSource<any>();
    const currentData = this.dataSourceBackedupNone.data;
   
    for (const departments of this.dataSourceBackedup.filteredData) {
      console.log(departments.departments);
      const flag = 0;
       for(const department of departments.departments )
       {
        console.log(department.deptName);
        if(option===department.deptName){
          currentData.push(departments)
          console.log(currentData);
          flag:1;
        }
       }
    }
   if(currentData.length===0){
        this.getAllEmployee();
        return;
   }
    this.dataSource.data = currentData;
    console.log( this.dataSource.data);
  }
 
  getAllEmployee(){
    this.api.getPost().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource= new MatTableDataSource(res);
        this.dataSourceBackedup= new MatTableDataSource(res);
        this.dataSource. paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(error)=>{
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

