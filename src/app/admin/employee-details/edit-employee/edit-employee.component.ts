import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Department } from '../../department/department.model';
import { AdminService } from '../../admin.service';
import { Designation } from '../../designation/designation.model';
import { Employee } from '../../employee-details/employee.model';
import { Params } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  
  departments : Department[] = this.adminService.departments;
  designations : Designation[] = this.adminService.designations;  
  departmentId: number;
  designationId:number;
  editMode = false;
  id:string;  
    
  editEmployeeForm: FormGroup
  subscription: Subscription;

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService,private http:HttpClient) { }

  ngOnInit(): void {       
    this.editEmployeeForm = new FormGroup({
      'username': new FormControl(null),
      'name': new FormControl(null),
      'email': new FormControl(null),
      'phoneNumber': new FormControl(null),
      'department': new FormControl('5f5bb07da42c3d060046a5ee'),
      'designation': new FormControl('5f5bb044a42c3d060046a5eb'), 
    });
    
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();               
        }
      );      
      
     
  }
  onSubmit() {    
    const username = this.editEmployeeForm.value['username'];
    const name = this.editEmployeeForm.value['name'];
    const email = this.editEmployeeForm.value['email'];
    const mobilephone = this.editEmployeeForm.value['phoneNumber'];
    const departmentId = this.editEmployeeForm.value['department'];
    const designationId = this.editEmployeeForm.value['designation'];
    // console.log(departmentId);
    // console.log(this.id);
    this.http.patch<Employee>(environment.userprofile + '/' + this.id,
      {
        username: username,
        name: name,
        email: email,
        mobilephone: mobilephone,
        departmentid: departmentId,
        designationid: designationId
      }).subscribe(editedEmployee => {
        // console.log(editedEmployee);
        this.adminService.updateEmployee(username,name,email,mobilephone,departmentId,designationId,editedEmployee._id);      
      }, error => {
        // console.log(error)
      });
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
    window.scroll(0,0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {    
    this.dataStorageService.getEmployee(this.id).subscribe(employee => {
      this.editEmployeeForm = new FormGroup({
        'username': new FormControl(employee.username, Validators.required),
        'name': new FormControl(employee.name, Validators.required),
        'email': new FormControl(employee.email, [Validators.required, Validators.email]),
        'phoneNumber': new FormControl(employee.mobilephone, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        'department': new FormControl(employee.departmentid._id),
        'designation': new FormControl(employee.designationid._id)
      });
      // console.log(employee);
    },
      errorRes => {
        // console.log(errorRes);
      });

  }
}
