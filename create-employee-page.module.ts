import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeePageRoutingModule } from './create-employee-page-routing.module';
import { FormsModule } from '@angular/forms';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@NgModule({
  declarations: [
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    CreateEmployeePageRoutingModule,
    FormsModule
    
  ]
})
export class CreateEmployeePageModule { }
