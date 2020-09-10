import { Component, OnInit, Input } from '@angular/core';
import { faPencilAlt,faTrash} from '@fortawesome/free-solid-svg-icons';

import { Department } from './department.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;  
  
  departments: Department[]; 
  
  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.adminService.departmentChanged
      .subscribe(
        (departments: Department[]) => {
          this.departments = departments;
        }
      );
    this.departments = this.adminService.getDepartment();
  }

  onAddDepartment() {
    this.router.navigate(['add'],{relativeTo: this.route})  
  }

  onDeleteDepartment(i) {   
    this.adminService.deleteDepartment(i);    
    console.log(i);
  }

}
