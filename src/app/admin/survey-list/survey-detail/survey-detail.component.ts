import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Question } from '../../question/question.model';
import { SurveyQuestion } from '../../new-survey/survey-question.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {

  id:string;
  name:string;
  surveyQuestions:SurveyQuestion[];
  constructor(private adminService:AdminService,private route:ActivatedRoute,private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];                               
      }
    ); 
    
    this.dataStorageService.getSurveyQuestions(this.id).subscribe(surveyQuestions=> {
      this.surveyQuestions = surveyQuestions;
    });
  }
  

}
