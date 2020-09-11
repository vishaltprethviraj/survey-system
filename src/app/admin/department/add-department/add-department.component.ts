import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Department } from '../department.model';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService,private http:HttpClient) { }

  addDepartmentForm: FormGroup;  
  department:Department[];

  ngOnInit(): void {
    this.addDepartmentForm = new FormGroup({
      'departmentName': new FormControl(null)      
    });
  }

  onSubmit() {        
    const departmentName = this.addDepartmentForm.value['departmentName'];       
    this.http.post<Department>('http://74.208.150.171:3501/api/v1/department',
          { 
            name: departmentName
          }).subscribe(newDepartment=>{
      this.adminService.addDepartment(newDepartment);
    });

    this.onCancel();
  }
    
  onCancel() {
    this.router.navigate(['/admin/department']);
  }

}
