import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee-details/employee.model';
import { AdminService } from '../admin.service';
import { AuditLog } from './audit-log.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuditList } from './audit-list.model';
import { environment } from 'src/environments/environment';

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
  auditLength:number;
  page:number = 1;
  slNo: number = 0;
  
  ngOnInit(): void {    
   this.auditLogForm = new FormGroup({
     'employee':new FormControl('5f5f3a933fe71d9a59aef343'),
     'pages':new FormControl('home'),
     'fromDate':new FormControl(''),
     'toDate':new FormControl('')
   });
   
  }
    
  minDate:string; 

  onChange() {
    let newMinDate = this.auditLogForm.value['fromDate'];    
    let newMinimumDate = new Date(newMinDate);
    newMinimumDate.setDate(newMinimumDate.getDate()+1);
    this.minDate = this.datePipe.transform(newMinimumDate,'yyyy-MM-dd');
    // console.log(this.minDate);
  }

  onSubmit() {
    const userid = this.auditLogForm.value['employee'];
    const page = this.auditLogForm.value['pages'];
    const fromDate = this.auditLogForm.value['fromDate'];
    const toDate = this.auditLogForm.value['toDate'];
    // console.log(userid);
    // console.log(page);
    // console.log(fromDate);
    // console.log(toDate);
    this.http.post<AuditLog>(environment.auditLog,{
     userid:userid,
     page:page,
     fromDate:fromDate,
     toDate:toDate
   }).subscribe(auditLog => {
    //  console.log(auditLog);
      this.auditList = auditLog.auditlist;
      this.hideTable = false;      
      this.auditLength = this.auditList.length;      
   });
  }
  

  increment_slNo() {
    this.slNo++;
  }

  handlePageChange(event) {
    this.page = event;
  }

}
