import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';

import { Employee } from './employee.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Params } from '@fortawesome/fontawesome-svg-core';

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

  id:number;

  constructor(private adminService: AdminService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.adminService.employeeChanged
    .subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );

    this.employees = this.adminService.getEmployee();
  }

  onAddEmployee() {
    this.router.navigate(['/admin/new-employee']);
  }

  onDeleteEmployee(i) {
    this.adminService.deleteEmployee(i);        
  }

  onEditEmployee(index:number) {
    this.adminService.startEditing.next(index);
    this.router.navigate([index,'edit'],{ relativeTo: this.route});    
  }
}
