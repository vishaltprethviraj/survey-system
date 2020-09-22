import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Department } from '../department/department.model';
import { AdminService } from '../admin.service';
import { Designation } from '../designation/designation.model';

import { Employee } from '../employee-details/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  defaultDepartment:string = '5f5bb070a42c3d060046a5ed';
  defaultDesignation:string = '5f5bb044a42c3d060046a5eb';

  ngOnInit(): void {  
            
  }  
  
  onSubmit() {    
    const username = this.newEmployeeForm.value['username'];
    const name = this.newEmployeeForm.value['name'];
    const email = this.newEmployeeForm.value['email'];
    const mobilephone = this.newEmployeeForm.value['phoneNumber'];
    const departmentId = this.newEmployeeForm.value['department'];
    const designationId = this.newEmployeeForm.value['designation'];
    // console.log(departmentId);
    // console.log(designationId);   
    this.http.post<Employee>(environment.userprofile,
    {
      username: username,
      name:name,
      email:email,
      mobilephone:mobilephone,
      departmentid:departmentId,
      designationid:designationId
    }).subscribe(newEmployee => {
        this.adminService.addEmployee(newEmployee);
        // console.log(newEmployee);
    });    
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/employee-details']);            
    window.scroll(0,0);
  }
}
