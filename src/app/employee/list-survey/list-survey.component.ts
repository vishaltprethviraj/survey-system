import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { SurveyQuestion } from 'src/app/admin/new-survey/survey-question.model';
import { Survey } from 'src/app/admin/survey-list/survey.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {
    
  surveys:Survey[]; 
  surveyQuestions:SurveyQuestion[];

  constructor(private router:Router,private route:ActivatedRoute,private dataStorageService:DataStorageService,private adminService:AdminService,private datePipe:DatePipe) {    
  }

  ngOnInit(): void {
    this.dataStorageService.surveyList().subscribe(surveys => {
      this.adminService.setSurvey(surveys);      
      console.log(surveys);
      this.surveys = this.adminService.surveys;
    });
  }

  onAttend(id:string) {
    console.log(id);
    this.dataStorageService.getSurveyQuestions(id).subscribe(surveyQuestion=> {
      this.surveyQuestions = surveyQuestion;
      this.router.navigate([id,'survey-question'],{ relativeTo: this.route })
    });
    
  }

}
