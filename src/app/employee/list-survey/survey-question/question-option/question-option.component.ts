import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/admin/question/question.model';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { Option } from 'src/app/admin/question/option.model';

@Component({
  selector: 'app-question-option',
  templateUrl: './question-option.component.html',
  styleUrls: ['./question-option.component.css']
})
export class QuestionOptionComponent implements OnInit {

  questions: Question;
  surveyQuestion:FormGroup;
  
  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router) { }
  id:number;
  indexOfQuestions = [0,1,2,3]  
  url;
  questionId:number;
  surveyResponse: Option;

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];        
        this.questions = this.adminService.getQuestions(this.id);
      }
    ); 
    this.surveyQuestion = new FormGroup({
      'option':new FormControl()
    });
        
  }

  onPrevious() {
    this.url = this.router.url;
    this.questionId = this.url.split('/').pop();    
    if((this.questionId-1)>=0) {
      this.router.navigate(['../',this.questionId-1],{relativeTo:this.route})
    }
    else {
      this.router.navigate(['../',this.questionId],{relativeTo:this.route})
    }
    
  }
  
  onNext() {    
    this.url = this.router.url;
    this.questionId = +(this.url.split('/').pop());        
    if((this.questionId+1)< this.indexOfQuestions.length) {
      this.router.navigate(['../',this.questionId+1],{ relativeTo:this.route });   
    }
    else {
      this.router.navigate(['../',this.questionId],{relativeTo:this.route})
    }
    
  }

  onSubmit() {
    this.surveyResponse = this.surveyQuestion.value['option'];
    console.log(this.surveyResponse);
  }
}
