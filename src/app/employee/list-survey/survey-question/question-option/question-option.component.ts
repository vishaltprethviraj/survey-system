import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/admin/question/question.model';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Option } from 'src/app/admin/question/option.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { SurveyQuestion } from 'src/app/admin/new-survey/survey-question.model';

@Component({
  selector: 'app-question-option',
  templateUrl: './question-option.component.html',
  styleUrls: ['./question-option.component.css']
})
export class QuestionOptionComponent {

  // questions: Question;
  // surveyQuestion:FormGroup;
  
  // constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router,private dataStorageService:DataStorageService) { }
  // id:string;
  // indexOfQuestions = [0,1,2,3]  
  // url;
  // surveyQuestions:SurveyQuestion[];
  // questionId:number;
  // surveyResponse: Option;

  // ngOnInit(): void {
  //   this.route.params
  //   .subscribe(
  //     (params: Params) => {
  //       this.id = params['id'];
  //       console.log(this.id);                
  //     }
  //   );
  //   // this.dataStorageService.getSurveyQuestions(this.id).subscribe(surveyQuestion=> {
  //   //   this.surveyQuestions = surveyQuestion;
  //   // });    
   
        
  // }

  // onPrevious() {
  //   this.url = this.router.url;
  //   this.questionId = this.url.split('/').pop();    
  //   if((this.questionId-1)>=0) {
  //     this.router.navigate(['../',this.questionId-1],{relativeTo:this.route})
  //   }
  //   else {
  //     this.router.navigate(['../',this.questionId],{relativeTo:this.route})
  //   }
    
  // }
  
  // onNext() {    
  //   this.url = this.router.url;
  //   this.questionId = +(this.url.split('/').pop());        
  //   if((this.questionId+1)< this.indexOfQuestions.length) {
  //     this.router.navigate(['../',this.questionId+1],{ relativeTo:this.route });   
  //   }
  //   else {
  //     this.router.navigate(['../',this.questionId],{relativeTo:this.route})
  //   }
    
  // }

  // onSubmit() {
  //   this.surveyResponse = this.surveyQuestion.value['option'];
  //   console.log(this.surveyResponse);
  // }
}
