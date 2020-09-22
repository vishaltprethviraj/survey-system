import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';

import { Employee } from './employee.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Department } from '../department/department.model';
import { Designation } from '../designation/designation.model';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  departments:Department[] = this.adminService.departments;
  designations:Designation[] = this.adminService.designations;
  employeeFilterForm: FormGroup;
  employees: Employee[] = this.adminService.employees;  
  id:string;
  slNo:[] ;

  constructor(private adminService: AdminService,private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService,private modalService:NgbModal,private http:HttpClient) { }

  ngOnInit(): void {

    this.employeeFilterForm = new FormGroup({      
      'department': new FormControl('5f5bb07da42c3d060046a5ee'),
      'designation': new FormControl('5f5bb044a42c3d060046a5eb'), 
    });

    this.dataStorageService.employeeList().subscribe(employees => {    
      this.adminService.setEmployee(employees);                 
      // console.log(employees);
      // console.log(this.adminService.employees);
    });

    this.adminService.employeeChanged
    .subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );
        
  }
  onShow() {
    this.employees = this.adminService.employees;
    const departmentId = this.employeeFilterForm.value['department'];
    const designationId = this.employeeFilterForm.value['designation'];
    this.employees = this.employees.filter(employee=> (employee.departmentid._id === departmentId && employee.designationid._id === designationId));
    console.log(this.employees);
  }

  onAddEmployee() {
    this.router.navigate(['/admin/new-employee']);
  }

  openModal(targetModal, employee) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   this.id = employee._id; 
   console.log(this.id);   
   }

   onDeleteEmployee() {
    console.log(this.id);    
    this.http.delete(environment.userprofile + '/' + this.id).subscribe(res => {
    console.log(res);
    this.adminService.deleteEmployee(this.id);    
  },
  error => {
    console.log(error);
  }); 
  this.modalService.dismissAll();       
   }
   
}
