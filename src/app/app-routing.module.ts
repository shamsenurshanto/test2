import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeptEmployeeListComponent } from './dept-employee-list/dept-employee-list.component';

const routes: Routes = [

  { path: 'home', component: DeptEmployeeListComponent },
  { path: 'contact', component: DeptEmployeeListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
