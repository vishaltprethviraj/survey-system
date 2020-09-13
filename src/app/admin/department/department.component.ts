import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { faPencilAlt,faTrash} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Department } from './department.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;  
  id:string;
  
  @ViewChild('f',{static:false}) newEmployeeForm: NgForm;

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService,private http:HttpClient,private modalService:NgbModal) { }

  departments: Department[] = this.adminService.departments;
  
  ngOnInit(): void {     
     this.adminService.departmentChanged
    .subscribe(
      (departments: Department[]) => {
        this.departments = departments;
      }
    );    
  }
   
  onAddDepartment() {
    this.router.navigate(['add'],{relativeTo: this.route});
    this.scrollDown();
  }
 
  
  scrollDown() {    
    scrollTo(50,100);
  }
  
  openModal(targetModal, department) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   this.id = department._id; 
   console.log(this.id);   
   }

   onDeleteDepartment() {
    console.log(this.id);
    const userData = JSON.parse(localStorage.getItem('userData')) ;
    this.http.delete('http://74.208.150.171:3501/api/v1/department/'+ this.id).subscribe(res => {
    this.adminService.deleteDepartment(this.id);    
  },
  error => {
    console.log(error);
  }); 
  this.modalService.dismissAll();       
   }

}
