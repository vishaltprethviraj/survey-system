import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Department } from '../department.model';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute) { }

  addDepartmentForm: FormGroup;

  ngOnInit(): void {
    this.addDepartmentForm = new FormGroup({
      'departmentName': new FormControl(null)      
    });
  }

  onSubmit() {
    const newDepartment = new Department(5,this.addDepartmentForm.value['departmentName']) ;
    this.adminService.addDepartment(newDepartment);  
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/department']);
  }

}
