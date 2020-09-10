import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Question } from '../../question/question.model';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {

  id:number;
  name:string;
  questions: Question[];
  constructor(private adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];        
        this.initForm();               
      }
    ); 
  }

  private initForm() {    
    let question = [];
    const survey = this.adminService.getSurveys(this.id);
    this.name = survey.name;             
  }

}
