import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateEmployeePageRoutingModule } from './update-employee-page-routing.module';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@NgModule({
  declarations: [
    UpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    UpdateEmployeePageRoutingModule,
    FormsModule
  ]
})
export class UpdateEmployeePageModule { }
