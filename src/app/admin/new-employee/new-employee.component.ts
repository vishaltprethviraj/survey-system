import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Department } from '../department/department.model';
import { AdminService } from '../admin.service';
import { Designation } from '../designation/designation.model';

import { Employee } from '../employee-details/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute,private http:HttpClient) { }
       
  @ViewChild('f',{static:false}) newEmployeeForm: NgForm;
  departments:Department[] = this.adminService.departments;
  designations:Designation[] = this.adminService.designations;
  defaultDepartment:string = '5f5b9e0720f2b9c05adaeabe';
  defaultDesignation:string = '5f5baa8e20f2b9c05adaeac5';

  ngOnInit(): void {  
            
  }  
  
  onSubmit() {    
    const username = this.newEmployeeForm.value['username'];
    const name = this.newEmployeeForm.value['name'];
    const email = this.newEmployeeForm.value['email'];
    const mobilephone = this.newEmployeeForm.value['phoneNumber'];
    const departmentId = this.newEmployeeForm.value['department'];
    const designationId = this.newEmployeeForm.value['designation'];
    console.log(departmentId);
    console.log(designationId);   
    this.http.post<Employee>('http://74.208.150.171:3501/api/v1/userprofile',
    {
      username: username,
      name:name,
      email:email,
      mobilephone:mobilephone,
      departmentid:departmentId,
      designationid:designationId
    }).subscribe(newEmployee => {
        // this.adminService.addEmployee(newEmployee);
        console.log(newEmployee);
    });    
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/employee-details']);            
    window.scroll(0,0);
  }
}
