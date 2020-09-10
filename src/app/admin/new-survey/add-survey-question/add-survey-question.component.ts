import { Component, OnInit } from '@angular/core';
import { Question } from '../../question/question.model';
import { AdminService } from '../../admin.service';
import { Option } from '../../question/option.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.css']
})
export class AddSurveyQuestionComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  questions: Question[];  
  options:Option[];  
  questionId = '0';

  addSurveyQuestionForm: FormGroup;

  ngOnInit(): void {
    let surveyQuestion = new FormArray([],Validators.required);
    this.addSurveyQuestionForm = new FormGroup({
      'surveyQuestion':surveyQuestion
    });
    
    (<FormArray>this.addSurveyQuestionForm.get('surveyQuestion')).push(
      new FormGroup({
        'surveyQuestion': new FormControl('0',Validators.required)
      })
    );
    
    this.questions = this.adminService.getQuestion();      
  }

  getOption(index:number) {
    this.options = this.questions[index].option;
    console.log(index);
  }

  onAddQuestion() {
    (<FormArray>this.addSurveyQuestionForm.get('surveyQuestion')).push(
      new FormGroup({
        'surveyQuestion': new FormControl('0',Validators.required)
      })
    );
  }

  onDeleteQuestion(index:number) {
    (<FormArray>this.addSurveyQuestionForm.get('surveyQuestion')).removeAt(index);
  }

  get controls() { 
    return (<FormArray>this.addSurveyQuestionForm.get('surveyQuestion')).controls;
  }

}
