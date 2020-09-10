import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent implements OnInit {

  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router) { }
  
  ngOnInit(): void {    
    // this.surveyQuestion = new FormGroup({
    //   'option':new FormControl()
    // });
    // this.questions = this.adminService.getQuestions(0);
    
  }

  
 


}
