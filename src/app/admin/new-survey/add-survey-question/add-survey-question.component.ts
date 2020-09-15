import { Component, OnInit } from '@angular/core';
import { Question } from '../../question/question.model';
import { AdminService } from '../../admin.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SurveyQuestion } from '../survey-question.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Survey } from '../../survey-list/survey.model';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.css']
})
export class AddSurveyQuestionComponent implements OnInit {

  constructor(private adminService:AdminService,private http:HttpClient,private dataStorageService:DataStorageService,private route:ActivatedRoute,private modalService:NgbModal) { }
  
  faTrash = faTrash;
  questions: Question[] = this.adminService.questions; 
  surveyQuestions: SurveyQuestion[];      
  addSurveyQuestionForm: FormGroup;
  id:string;
  isAdded = false;
  questionId:string;

  ngOnInit(): void {    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        }
      );
    console.log("SurveyID: "+this.id);
        
    this.adminService.surveyQuestionChanged
    .subscribe(
      (surveyQuestions: SurveyQuestion[]) => {
        this.surveyQuestions = surveyQuestions;
      }
    ); 
    this.addSurveyQuestionForm = new FormGroup({
      'surveyQuestion': new FormControl("5f5d40233fedda12bc913ef8")
    });

  }
  
  selectedQuestion: Question[];
  options: [];  
  selectedQuestionId:string;

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
                                    questionid: questionId
                                  }).subscribe(newSurveyQuestion => {
                                    console.log(newSurveyQuestion);                                    
                                    this.adminService.addSurveyQuestion(newSurveyQuestion);
                                    this.isAdded = true;
                                    this.selectedQuestionId = newSurveyQuestion.questionid._id;
                                  });

    this.dataStorageService.getSurveyQuestions(this.id).subscribe(surveyQuestions => {
      this.surveyQuestions = surveyQuestions;
      console.log(surveyQuestions);
    });                                
  }

  openModal(targetModal, surveyQuestion) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   this.questionId = surveyQuestion.questionid._id; 
   console.log(this.id);   
   }

   onDeleteSurveyQuestion() {
    console.log(this.id);
    // const userData = JSON.parse(localStorage.getItem('userData')) ;
    console.log(this.questionId);    
    this.http.delete<SurveyQuestion>('http://74.208.150.171:3501/api/v1/surveyquestion/'+ this.id+'/'+this.questionId).subscribe(surveyQuestion => {    
    console.log(surveyQuestion);  
    this.adminService.deleteSurveyQuestions(this.id,this.questionId);  
  },
  error => {
    console.log(error);
  });   
  this.modalService.dismissAll();       
   }
   

}
