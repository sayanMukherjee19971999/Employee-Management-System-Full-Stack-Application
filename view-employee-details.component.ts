import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../employee-module/employee';
import { EmployeeServiceService } from '../../employee-service.service';

@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html',
  styleUrls: ['./view-employee-details.component.css']
})
export class ViewEmployeeDetailsComponent implements OnInit {

  id:number=-1
  employee:Employee=new Employee()
  constructor(private es:EmployeeServiceService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.es.getEmployeeById(this.id).subscribe(data=>{
      this.employee=data
    })
  }

}
