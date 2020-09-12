import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';

import { Employee } from './employee.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  
  employees: Employee[];

  id:string;

  constructor(private adminService: AdminService,private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService,private modalService:NgbModal,private http:HttpClient) { }

  ngOnInit(): void {
    this.dataStorageService.employeeList().subscribe(employees => {
      this.adminService.setEmployee(employees);
      console.log(employees);
      console.log(this.adminService.employees);
    });

    this.adminService.employeeChanged
    .subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );
    
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
    this.http.delete('http://74.208.150.171:3501/api/v1/userprofile/'+ this.id).subscribe(res => {
    console.log(res);
    this.adminService.deleteEmployee(this.id);    
  },
  error => {
    console.log(error);
  }); 
  this.modalService.dismissAll();       
   }
   
}
