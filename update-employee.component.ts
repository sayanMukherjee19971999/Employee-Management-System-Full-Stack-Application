import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../employee-module/employee';
import { EmployeeServiceService } from '../../employee-service.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id:number =-1;
  employee:Employee=new Employee()
  constructor( private es: EmployeeServiceService, private router:Router ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.es.getEmployeeById(this.id).subscribe(da=>{
      this.employee=da
    }, error=>console.log(error));
  }

  onSubmit(){
    this.es.updateEmployee(this.id,this.employee).subscribe(data=>{
      this.goToEmployeeList()
    }, error=> console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
}
