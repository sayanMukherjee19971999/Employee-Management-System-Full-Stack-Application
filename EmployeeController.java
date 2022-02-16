package com.employee.management.controller;

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
