import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Department } from '../department/department.model';
import { AdminService } from '../admin.service';
import { Designation } from '../designation/designation.model';

import { Employee } from '../employee-details/employee.model';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute) { }
  
  departments : Department[];
  designations : Designation[]; 
  
  departmentId: number;
  designationId: number;

  @ViewChild('f',{static:false}) newEmployeeForm: NgForm;
   
  defaultDepartment = '0' 
  defaultDesignation = '0'; 

  ngOnInit(): void {  
    this.departments = this.adminService.getDepartment();
    this.designations = this.adminService.getDesignation();           
  }  
  
  onSubmit() {    
    this.departmentId = this.newEmployeeForm.value['department'];
    this.designationId = this.newEmployeeForm.value['designation'];    
    const newEmployee = new Employee('1',
                                    this.newEmployeeForm.value['username'],
                                    '1234',
                                    this.newEmployeeForm.value['name'],
                                    this.newEmployeeForm.value['email'],
                                    this.newEmployeeForm.value['phoneNumber'],                                                                      
                                    this.adminService.getDepartments(this.departmentId),
                                    this.adminService.getDesignations(this.designationId),
                                    {_id:'1',rolename:'employee'});
    this.adminService.addEmployee(newEmployee);
    // console.log(this.newEmployeeForm);
    // console.log(newEmployee);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/employee-details']);
    window.scroll(0,0);
  }
}
