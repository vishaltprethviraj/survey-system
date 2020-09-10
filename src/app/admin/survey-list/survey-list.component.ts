import { Component, OnInit } from '@angular/core';
import { Survey } from './survey.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  surveys:Survey[];

  constructor(private adminService:AdminService) { }
  

  ngOnInit(): void {
    this.adminService.surveyChanged
      .subscribe(
        (surveys: Survey[]) => {
          this.surveys = surveys;
        }
      );
    this.surveys = this.adminService.getSurvey();    
    // console.log(this.surveys);
  }

}
