# Employee-Management-System-Full-Stack-Application
This is a full stack application with complete functionality that is required to manage a employee through creating an emloyee in database, view an employe from the database, list of employees in the database, updating an employee detail in the dataase and deleting an employee from the database. The technologies usd in this application are Java SpringBoot for backend and Angular for frontend.

### Starting Point Of SpringBoot Application
### _Create A Package And Create A Class EmployeemanagementApplication Class_
`package com.employee.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeemanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeemanagementApplication.class, args);
	}

}
`
### Controller Class For Handling Web Requests
### Create a subpackage and create a Controller Class
`package com.employee.management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.management.exception.ResourceNotFoundException;
import com.employee.management.model.Employee;
import com.employee.management.repository.EmployeeRepository;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	//get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return this.employeeRepository.findAll();
	}
	
	//create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee emp) {
		return this.employeeRepository.save(emp);
	}
	
	//get employee by id rest api
	@GetMapping("/employees/{empId}")
	public ResponseEntity<Employee> getEmployee(@PathVariable long empId) {
		Employee emp=this.employeeRepository.findById(empId).orElseThrow(()-> new ResourceNotFoundException("Employee Not Found with Id: "+empId));
		return ResponseEntity.ok(emp);
	}
	
	//update emloyee rest api
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee emp) {
		Employee employee=this.employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee Not Found with Id: "+id));
		employee.setFirstName(emp.getFirstName());
		employee.setLastname(emp.getLastname());
		employee.setEmailId(emp.getEmailId());
		
		Employee updatedEmployee=employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	//delete employee rest api
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable long id){
		Employee employee=this.employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee Not Found with Id: "+id));
		employeeRepository.delete(employee);
		Map<String,Boolean> response=new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
`

### Entity for storing the entity in database
### Create a subpackage and create a class Employee.java for storing the employee in database
`package com.employee.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.web.bind.annotation.RequestMapping;

@Entity
@Table(name="employee_details")
public class Employee {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="emp_firstName")
	private String firstName;
	
	@Column(name="emp_lastName")
	private String lastname;
	
	@Column(name="emp_emailId")
	private String emailId;

	public Employee() {}

	public Employee(long id, String firstName, String lastname, String emailId) {
		
		this.id = id;
		this.firstName = firstName;
		this.lastname = lastname;
		this.emailId = emailId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastname=" + lastname + ", emailId=" + emailId
				+ "]";
	}
	
	

}
`

### Exception class for handling the exception if any occurs
### Create a subpackage and create a class  ResourceNotFoundException.java
`package com.employee.management.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String message) {
		super(message);
	}
}
`

### Repository Interface that extends the JPARepository to implement the basic CRUD( Create, Read, Update and Delete) operations
### Create a subpackage and create a interface EmployeeRepository.java
`package com.employee.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employee.management.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
`

### Do the necessary database and hibernate configurations in the application.properties file to connect to the database
`spring.datasource.url=jdbc:mysql://localhost:3306/employee_management
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
`

### Use the necessary dependencies in the pom.xml file to allow maven to automatically download all the dependencies and do the necessary configuration automatically
`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.6.3</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.employee.management</groupId>
	<artifactId>employeemanagement</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>employeemanagement</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<scope>runtime</scope>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
`
### **FRONT-END PART STARTS**

### app.component.html
`<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Employee Management System</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a [routerLink]="'/employees'" routerLinkActive="active" class="nav-link">Employee List</a>
          </li>
          <li class="nav-item">
            <a [routerLink]="'/create'" routerLinkActive="active" class="nav-link">Add Employee</a>
          </li>
          
        </ul>
      </div>
    </div>
</nav>

<div>
    <router-outlet></router-outlet>
</div>
`

### Create a module home-page that includes the component employee-list

### home-page.module.ts
`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-page-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';


@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule
  ]
})
export class HomePageModule { }
`

### home-page-routing.module.ts
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
`

### Inside the employee-list component
### employee-list.component.html
`<h1 class="text-center mt-3">Employee List</h1>
<div class="container mt-5">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Update Employee Details</th>
                <th>Delete Employee Details</th>
                <th>View Employee Details</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let i of employees">
                <td>{{i.firstName}}</td>
                <td>{{i.lastname}}</td>
                <td>{{i.emailId}}</td>
                <td>
                    <button class="btn btn-info" (click)="updateEmployee(i.id)">Update</button>
                </td>
                <td>
                    <button class="btn btn-success" (click)="deleteEmployee(i.id)">Delete</button>
                </td>
                <td>
                    <button class="btn btn-warning" (click)="viewEmployee(i.id)">View Employee</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>`

### employee-list.comonent.ts
`import { Component, OnInit } from '@angular/core';
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
`

### Crate a module employee-module
### Create a typescript class employee.ts to accept the entries from the database
`export class Employee {
    firstName: string ='';
    lastname: string ='';
    emailId: string ='';
    id:number=0;
}
`

### Create a module create-emploee-page and create a component create-employee inside it

### create-employee-page.module.ts
`import { NgModule } from '@angular/core';
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
`

### create-employee-page-routing.module.ts
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
const routes: Routes = [
    {
      path: '',
      component: CreateEmployeeComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEmployeePageRoutingModule { }
`

### Inside component create-employee

###  create-employee.component.html
`<h3 class="text-center mt-3 mb-5">Add Employee</h3>
<div class="col-md-6 offset-md-3">
    <form (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" id="firstName"
                [(ngModel)]="employee.firstName" name="firstName">
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" id="lastname"
                [(ngModel)]="employee.lastname" name="lastName">
        </div>
        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" id="emailId"
                [(ngModel)]="employee.emailId" name="emailId">
        </div>
    
        <button class="btn btn-success mt-3" type="submit">SUBMIT</button>
    </form>
</div>
`
### create-employee.component.ts
`import { Component, OnInit } from '@angular/core';
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
`


### Create a module update-employee-page and create a component update-employee
### update-employee-page-routing.module.ts
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
const routes: Routes = [
  {
    path: '',
    component: UpdateEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateEmployeePageRoutingModule { }
`

### update-employee-page.module.ts
`import { NgModule } from '@angular/core';
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
`

### Inside update-employee component

### update-employee.component.html
`<h3 class="text-center mt-3 mb-5">Update Employee</h3>
<div class="col-md-6 offset-md-3">
    <form (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" id="firstName"
                [(ngModel)]="employee.firstName" name="firstName">
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" id="lastname"
                [(ngModel)]="employee.lastname" name="lastName">
        </div>
        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" id="emailId"
                [(ngModel)]="employee.emailId" name="emailId">
        </div>
    
        <button class="btn btn-danger mt-3" type="submit">SUBMIT</button>
    </form>
</div>
`
### update-employee.component.ts
`import { Component, OnInit } from '@angular/core';
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
`

### Create a new module view-employee-details-page and create a new component view-employe-details

### view-employee-details-page-routing.module.ts
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeeDetailsComponent } from './view-employee-details/view-employee-details.component';
const routes: Routes = [
  {
    path: '',
    component: ViewEmployeeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewEmployeeDetailsPageRoutingModule { }
`

### view-employee-details-page.module.ts
`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEmployeeDetailsPageRoutingModule } from './view-employee-details-page-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ViewEmployeeDetailsPageRoutingModule
  ]
})
export class ViewEmployeeDetailsPageModule { }
`

### Inside view-employee-details component

### view-employee-details.component.html
`<h2 class="text-center mt-3">Employee Details</h2>
<div class="container text-center mt-5 border border-5">
    <div>
        <label><b>First Name: </b></label> {{employee.firstName}}
    </div>
    <div>
        <label><b>Last Name: </b></label> {{employee.lastname}}
    </div>
    <div>
        <label><b>Email ID: </b></label> {{employee.emailId}}
    </div>
</div>`

### view-employee-details.component.ts
`import { Component, OnInit } from '@angular/core';
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
`

### In the app.module.ts file
`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`

### In the app-routing.module.ts file
`import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'employees',
    loadChildren:()=>import('./home-page/home-page.module').then(module=>module.HomePageModule)
  },
  {
    path: 'create',
    loadChildren:()=>import('./create-employee-page/create-employee-page.module').then(module=>module.CreateEmployeePageModule)
  },
  {
    path: 'update/:id',
    loadChildren:()=>import('./update-employee-page/update-employee-page.module').then(module=>module.UpdateEmployeePageModule)
  },
  {
    path: 'employee-details/:id',
    loadChildren:()=>import('./view-employee-details-page/view-employee-details-page.module').then(module=>module.ViewEmployeeDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
`

### In employee-service.service.ts file
`import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee-module/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseURL = "http://localhost:8080/home/employees";

  constructor(private httpClient: HttpClient) { }
  
  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  addEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`)
  }

  updateEmployee(id: number, employee: Employee) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,employee);
  }

  deleteEmployee(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }
}
`

### Home Page of the Employee Management Application
![Home Page](https://user-images.githubusercontent.com/77445866/154228088-760122ba-f68a-4f69-bfe2-6a7c9f1fe41e.PNG)


### Update Employee Page of the Employee Management Application
![Update Employee Page](https://user-images.githubusercontent.com/77445866/154228208-e76bda85-cf2b-4ce5-8d5c-5ec8d4f0d09f.PNG)


### Add Employee Page of the Employee Management Application
![Add Employee Page](https://user-images.githubusercontent.com/77445866/154228314-f4e912b9-ac15-45cd-9b39-000d34bf5587.PNG)


### View Employee Page of the Employee Management Application
![View Employee Page](https://user-images.githubusercontent.com/77445866/154228424-6667ba5c-8275-4c73-881e-f66a241ccc7c.PNG)



