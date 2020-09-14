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
        
    
    this.addSurveyQuestionForm = new FormGroup({
      'surveyQuestion': new FormControl("5f5f38d23fe71d9a59aef33f")
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
                                    questionid: questionId
                                  }).subscribe(newSurveyQuestion => {
                                    console.log(newSurveyQuestion);                                    
                                    this.adminService.addSurveyQuestion(newSurveyQuestion);
                                    this.isAdded = true;
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
    this.http.delete('http://74.208.150.171:3501/api/v1/surveyquestion/'+ this.id+'/'+this.questionId).subscribe(res => {
    console.log(res);    
  },
  error => {
    console.log(error);
  }); 
  this.modalService.dismissAll();       
   }

   onCancel() {
    
    this.http.delete('http://74.208.150.171:3501/api/v1/surveyquestion/'+ this.id).subscribe(res => {
      console.log(res);
    },
    error => {
      console.log(error);
    }); 

    this.http.delete('http://74.208.150.171:3501/api/v1/survey/'+ this.id).subscribe(res => {
      console.log(res);
    },
    error => {
      console.log(error);
    }); 

   }

}
