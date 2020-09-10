import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee-details/employee.model';
import { AdminService } from '../admin.service';
import { AuditLog } from './audit-log.model';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  employees: Employee[];
  auditLogs: AuditLog[];

  ngOnInit(): void {
    this.employees = this.adminService.getEmployee();
    this.auditLogs = this.adminService.getAuditLog();
    console.log(this.auditLogs);
  }

}
