import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Question } from 'src/app/admin/question/question.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/login/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent implements OnInit {
  id: string;
  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router, private dataStorageService: DataStorageService,private http:HttpClient) { }
  questions: Question[] = [];

  indexOfQuestions = []  
  user:User;
  questionId: number;
  surveyResponse: string;

  surveyQuestionForm: FormGroup;
  currentQuestion: Question;
  totalQuestions: number;
  selectedQuestion: number;
  surveyName:string;

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['surveyId'];
          console.log(this.id);
          this.dataStorageService.getSurveyQuestions(this.id).subscribe(surveyQuestions => {
            this.surveyName = surveyQuestions[0].surveyid.name;            
            console.log(surveyQuestions);
            console.log(surveyQuestions.length);
            for (let i = 0; i < (surveyQuestions.length); i++) {
              this.questions[i] = surveyQuestions[i].questionid;

            }
            this.currentQuestion = this.questions[0];
            this.totalQuestions = surveyQuestions.length;
            console.log(this.totalQuestions);
            console.log(this.questions);
            this.initializeNumberofQuestions();
          });

        }
      );
    this.surveyQuestionForm = new FormGroup({
      'option': new FormControl(null,Validators.required)
    });

  }

  initializeNumberofQuestions() {
    for (let i = 0; i < this.totalQuestions; i++) {
      this.indexOfQuestions.push(i);
    }
  }
  qno: number = 1;
 
  onSelectQuestionNumber(i: number) {
    this.currentQuestion = this.questions[i];
    this.qno = i + 1;
  }

  onPrevious() {
    let index = this.questions.indexOf(this.currentQuestion);
    this.selectedQuestion = index + 1;
    if (index > 0 && index < this.totalQuestions) {
      this.currentQuestion = this.questions[index - 1];
    }
    if(this.qno > 1) {
     this.qno--;
    }
  }

  onSubmit() {
    
    const description = this.currentQuestion.description;
    const questionid = this.currentQuestion._id;
    let index = this.questions.indexOf(this.currentQuestion);
    this.selectedQuestion = index;    
    if (index+1 < this.totalQuestions) {
      this.currentQuestion = this.questions[index + 1];
    }
    if(this.qno < this.totalQuestions) {
      this.qno++;
    }        
    // console.log(this.surveyResponse);    
    // console.log(this.selectedQuestion+1);
    // console.log(this.totalQuestions);
    this.user = JSON.parse(localStorage.getItem('userData'));      
    this.surveyResponse = this.surveyQuestionForm.value['option'];
    console.log(description);
    console.log(questionid);
    console.log(this.user._id);
    console.log(this.id);    
    console.log(this.surveyResponse);
    this.http.post("http://74.208.150.171:3501/api/v1/surveyresponse",{
      "surveyid": this.id,
	    "userid": this.user._id,
	    "questionid": questionid,
	    "response": this.surveyResponse
    }).subscribe(resData => {
      console.log(resData);
    });
    
    if((this.selectedQuestion+1) == this.totalQuestions) {
      this.router.navigate(['/employee/ok-page']);
    }   
  }
  


}
