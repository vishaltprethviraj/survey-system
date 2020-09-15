import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee-details/employee.model';
import { AdminService } from '../admin.service';
import { AuditLog } from './audit-log.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuditList } from './audit-list.model';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {

  constructor(private adminService:AdminService,private http:HttpClient,private datePipe:DatePipe) { }

  employees: Employee[] = this.adminService.employees;
  auditLogs: AuditLog[];
  pages = ['home','survey attended page'];
  auditLogForm: FormGroup;
  auditLog:AuditLog;
  auditList:AuditList[];
  hideTable:boolean = true; 

  ngOnInit(): void {    
   this.auditLogForm = new FormGroup({
     'employee':new FormControl('5f5f3a933fe71d9a59aef343'),
     'pages':new FormControl('home'),
     'fromDate':new FormControl(''),
     'toDate':new FormControl('')
   });
  }
  
  fromDate:string;

  onSubmit() {
    const userid = this.auditLogForm.value['employee'];
    const page = this.auditLogForm.value['pages'];
    const fromDate = this.auditLogForm.value['fromDate'];
    const toDate = this.auditLogForm.value['toDate'];
    console.log(userid);
    console.log(page);
    console.log(fromDate);
    console.log(toDate);
    this.http.post<AuditLog>('http://74.208.150.171:3501/api/v1/auditlog',{
     userid:userid,
     page:page,
     fromDate:fromDate,
     toDate:toDate
   }).subscribe(auditLog => {
     console.log(auditLog);
      this.auditList = auditLog.auditlist;
      this.hideTable = false;      
      
      
   });
  }

}
