import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee-module/employee';
import { EmployeeServiceService } from 'src/app/employee-service.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[]=[];
  constructor(
    private es: EmployeeServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    
  }

  private getEmployees(){
    this.es.getEmployeesList().subscribe(data=>{
      console.warn(data);
      this.employees=data
    });
  }

  updateEmployee(id: number){
    this.router.navigate(['update',id])
  }

  deleteEmployee(id: number){
    this.es.deleteEmployee(id).subscribe(data=>{
      this.getEmployees()
    })
  }

  viewEmployee(id: number){
    this.router.navigate(['employee-details',id])
  }

}
