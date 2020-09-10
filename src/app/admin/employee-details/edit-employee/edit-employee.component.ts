import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Department } from '../../department/department.model';
import { AdminService } from '../../admin.service';
import { Designation } from '../../designation/designation.model';
import { Employee } from '../../employee-details/employee.model';
import { Params } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  
  departments : Department[];
  designations : Designation[];  
  departmentId: number;
  designationId:number;
  editMode = false;
  id:number;  
    
  editEmployeeForm: FormGroup
  subscription: Subscription;

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {       
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();               
        }
      );          
    
    this.departments = this.adminService.getDepartment();
    this.designations = this.adminService.getDesignation(); 
  }
  onSubmit() {    
    this.departmentId = this.editEmployeeForm.value['department'];
    this.designationId = this.editEmployeeForm.value['designation'];    
    const newEmployee = new Employee(this.editEmployeeForm.value['username'],
                                    this.editEmployeeForm.value['name'],
                                    this.editEmployeeForm.value['email'],
                                    this.editEmployeeForm.value['phoneNumber'],                                                                      
                                    [this.adminService.getDepartments(this.departmentId)],
                                    [this.adminService.getDesignations(this.designationId)]);
    this.adminService.updateEmployee(this.id,newEmployee);
    // console.log(this.newEmployeeForm);
    // console.log(newEmployee);    
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
    let username = '';
    let name = '';
    let email = '';
    let phoneNumber = '';
    let department = '';
    let designation = '';
    if(this.editMode) {
      const employee = this.adminService.getEmployees(this.id);
        username = employee.username;
        name = employee.name;
        email = employee.email;
        phoneNumber = employee.phoneNumber;
        department = '0';
        designation = '1';
    }
    this.editEmployeeForm = new FormGroup({
      'username': new FormControl(username,Validators.required),
      'name': new FormControl(name,Validators.required),
      'email': new FormControl(email,[Validators.required,Validators.email]),
      'phoneNumber': new FormControl(phoneNumber,[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      'department': new FormControl('0'),
      'designation': new FormControl('1'),
    });
  }
}
