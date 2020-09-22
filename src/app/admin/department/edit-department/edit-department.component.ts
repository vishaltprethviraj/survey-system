import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../department.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})

export class EditDepartmentComponent implements OnInit {

  id: string;
  editMode = false;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private router: Router, private dataStorageService: DataStorageService, private http: HttpClient) { }

  editDepartmentForm: FormGroup;
  departmentName: string = ''
  departments: Department;

  ngOnInit(): void {
    this.editDepartmentForm = new FormGroup({
      'departmentName': new FormControl(null)
    });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );

  }

  onSubmit() {
    this.editDepartment();
    this.onCancel();

  }

  editDepartment() {
    const departmentName = this.editDepartmentForm.value['departmentName'];
    this.http.patch<Department>(environment.department + '/' + this.id,
      {
        name: departmentName
      }).subscribe(editedDepartment => {
        // console.log(editedDepartment);
        this.adminService.updateDepartment(departmentName, editedDepartment._id);
      }, error => {
        // console.log(error)
      });
  }
  onCancel() {
    this.router.navigate(['/admin/department']);
  }


  private initForm() {

    this.dataStorageService.getDepartment(this.id).subscribe(department => {
      this.editDepartmentForm = new FormGroup({
        'departmentName': new FormControl(department.name),
      });
    },
      errorRes => {
        // console.log(errorRes);
      });

  }

}
