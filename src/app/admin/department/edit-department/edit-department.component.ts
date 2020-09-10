import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Department } from '../department.model';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
    
  id: number;
  editMode = false;
 
  constructor(private route:ActivatedRoute,private adminService:AdminService,private router:Router) { }

  editDepartmentForm: FormGroup;

  ngOnInit(): void {    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();               
        }
      );    
        
  } 

  onSubmit() {
    const newDepartment = new Department(this.id,this.editDepartmentForm.value['departmentName']) ;
    if(this.editMode) {
      this.adminService.updateDepartment(this.id,newDepartment);      
    }            
    this.onCancel();
    
  }

  onCancel() {
    this.router.navigate(['/admin/department']);
  }

  private initForm() {
    let departmentName=''
    
    if (this.editMode) {
      const department = this.adminService.getDepartments(this.id);
      departmentName = department.departmentName;
    }
    this.editDepartmentForm = new FormGroup({
      'departmentName': new FormControl(departmentName) 
    });
  }
  
}

 
