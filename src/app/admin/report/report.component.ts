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
  reportForm: FormGroup;
  userlist: UserList[];
  surveyResponses: SurveyResponse[] = [];

  ngOnInit(): void {
    this.surveys = this.adminService.surveys;  
    this.employees = this.adminService.employees;
    this.reportForm = new FormGroup({
      'survey': new FormControl('5f596a149587ea2c4c758fc4'),
      'employee': new FormControl('5f5fb478eca8711d389c07f2')
    });
    
  }

  onSurveySelect() {
    const surveyid = this.reportForm.value['survey'];
    this.http.get<Report>('http://74.208.150.171:3501/api/v1/surveyresponse/'+surveyid).subscribe(report => {
        console.log(report.userlist);                      
        this.userlist = report.userlist;
    });
  }

  onUserSelect() {
    const surveyid = this.reportForm.value['survey'];
    const userid = this.reportForm.value['employee'];
    console.log(userid);
    this.http.get<ReportFinal>('http://74.208.150.171:3501/api/v1/surveyresponse/'+surveyid+'/'+userid).subscribe(surveyResponses => {
        this.surveyResponses = surveyResponses.surveyresponse;
    });
  }


}
