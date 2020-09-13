import { Component, OnInit } from '@angular/core';
import { Question } from '../../question/question.model';
import { AdminService } from '../../admin.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SurveyQuestion } from '../survey-question.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.css']
})
export class AddSurveyQuestionComponent implements OnInit {

  constructor(private adminService:AdminService,private http:HttpClient,private dataStorageService:DataStorageService,private route:ActivatedRoute) { }

  questions: Question[] = this.adminService.questions; 
  surveyQuestions: SurveyQuestion[];      
  addSurveyQuestionForm: FormGroup;
  id:string;
  isAdded = false;

  ngOnInit(): void {    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        }
      );
    console.log("SurveyID: "+this.id);
        
    
    this.addSurveyQuestionForm = new FormGroup({
      'surveyQuestion': new FormControl('5f5d05704600aefd987a511')
    });

  }
  
  selectedQuestion: Question[];
  options: [];  
  
  getOption(id:string) {    
    this.selectedQuestion = this.questions.filter(question => question._id == id);
    let index = this.questions.indexOf(this.selectedQuestion[0]);
    this.options = this.questions[index].options;    
  }

  onAddQuestion() {   
 
    const questionId = this.addSurveyQuestionForm.value['surveyQuestion'];    
    console.log("Survey ID: "+this.id);
    this.http.post<SurveyQuestion>('http://74.208.150.171:3501/api/v1/surveyquestion',
                                  {
                                    surveyid: this.id,
                                    questionId: questionId
                                  }).subscribe(newSurveyQuestion => {
                                    console.log(newSurveyQuestion);
                                    console.log("questionId: "+questionId);
                                    this.isAdded = true;
                                  });

    this.dataStorageService.getSurveyQuestions(this.id).subscribe(surveyQuestions => {
      this.surveyQuestions = surveyQuestions;
      console.log(surveyQuestions);
    });                                
  }

}
