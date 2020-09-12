import { Component, OnInit } from '@angular/core';
import { Survey } from './survey.model';
import { AdminService } from '../admin.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  surveys:Survey[] = this.adminService.surveys;

  constructor(private adminService:AdminService,private dataStorageService:DataStorageService) { }
  

  ngOnInit(): void {
    this.dataStorageService.surveyList().subscribe(surveys => {
      this.adminService.setSurvey(surveys);
      console.log(surveys);
    });

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
