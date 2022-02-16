import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../employee-module/employee';
import { EmployeeServiceService } from '../../employee-service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee:Employee=new Employee()
  constructor( private es: EmployeeServiceService , private router:Router) { }

  ngOnInit(): void {
  }

  saveEmployee(){
    this.es.addEmployee(this.employee).subscribe(data=>{
      console.log(data)
      this.goToEmployeeList()
    },
    error=> console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }

  onSubmit(){
    console.log(this.employee)
    this.saveEmployee()
  }
}
