import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Employee } from '../employee-details/employee.model';
import { Survey } from '../survey-list/survey.model';
import { Report } from './report.model';
import { UserList } from './userlist.model';
import { SurveyResponse } from './survey-response.model';
import { ReportFinal } from './report-final.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})


export class ReportComponent implements OnInit {
  
  constructor(private adminService:AdminService,private http:HttpClient) {
  }

  surveys:Survey[] = [];
  employees:Employee[] = [];
  notEmployee:Employee[] = [];
  reportForm: FormGroup;
  userlist: UserList[];
  surveyResponses: SurveyResponse[] = [];
  hideTableSurvey = true;
  hideTableResponse = true;
  hideAlert = true;
  j:number = 0;

  ngOnInit(): void {
    this.surveys = this.adminService.surveys;      
    this.employees = this.adminService.employees.slice(1);    
    this.reportForm = new FormGroup({
      'survey': new FormControl('5f5f3f813fe71d9a59aef34c'),
      'employee': new FormControl('5f5fb478eca8711d389c07f2')
    });
    
  }
  
  onShow() {
    const surveyid = this.reportForm.value['survey'];
    this.http.get<Report>(environment.surveyResponse + '/' +surveyid).subscribe(report => {
        // console.log(report.userlist);                      
        this.userlist = report.userlist.slice(1);        
        this.hideTableSurvey = false;        
    });

    const userid = this.reportForm.value['employee'];
    // console.log(userid);
    this.http.get<ReportFinal>(environment.surveyResponse + '/' + surveyid + '/' + userid).subscribe(surveyResponses => {
        this.surveyResponses = surveyResponses.surveyresponse;
        if(this.surveyResponses.length==0) {
          this.hideTableResponse = true;
          this.hideAlert = false;
        }
        else {          
          this.hideTableResponse = false;
          this.hideAlert = true;          
        }
    });
    scrollTo(150,300);        
  }
  


}
