import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Question } from '../../question/question.model';
import { SurveyQuestion } from '../../new-survey/survey-question.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {

  id:string;
  name:string;
  surveyQuestions:SurveyQuestion[];
  questions:Question[] = this.adminService.questions;
  editSQForm:FormGroup;
  faPencilAlt = faPencilAlt
  faTrash = faTrash;

  constructor(private adminService:AdminService,private route:ActivatedRoute,private dataStorageService:DataStorageService,private modalService:NgbModal,private http:HttpClient) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];                               
      }
    ); 
    
    this.dataStorageService.getSurveyQuestions(this.id).subscribe(surveyQuestions=> {
      this.surveyQuestions = surveyQuestions;
    });
        

    this.editSQForm = new FormGroup({
      'surveyQuestion':new FormControl()
    });
  }
  
  selectedQuestion:Question[];
  options:[] = [];

  getOption(id:string) {    
    this.selectedQuestion = this.questions.filter(question => question._id == id);
    let index = this.questions.indexOf(this.selectedQuestion[0]);
    this.options = this.questions[index].options;    
  }
  questionIdEdit:string;

  openModalEdit(targetModal, surveyQuestion) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editSQForm.patchValue({
     surveyQuestion: surveyQuestion.questionid._id,     
    });
    this.questionIdEdit = surveyQuestion.questionid._id;
   }

   selectedSurveyQuestion:SurveyQuestion[];

   onSubmit() {
    const questionId = this.editSQForm.value['surveyQuestion'];
    const surveyId = this.id;
    // console.log(questionId);
    // console.log(surveyId);
    this.http.patch<SurveyQuestion>('http://74.208.150.171:3501/api/v1/surveyquestion/'+this.id+'/'+this.questionIdEdit,{
      questionid:questionId
    }).subscribe(surveyQuestion=> 
      {
        // console.log(surveyQuestion);
        this.adminService.updateSurveyQuestion(this.id,this.questionIdEdit,surveyQuestion);
        this.selectedSurveyQuestion = this.surveyQuestions.filter(surveyQuestions => (surveyQuestions.surveyid._id == this.id && surveyQuestions.questionid._id == this.questionIdEdit));
        let index = this.surveyQuestions.indexOf(this.selectedSurveyQuestion[0]);                        
        this.surveyQuestions[index] = surveyQuestion;        
      
      });
    this.modalService.dismissAll();
   }

   questionId:string;

   openModal(targetModal, surveyQuestion) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   this.questionId = surveyQuestion.questionid._id; 
  //  console.log(this.id);   
   }

   onDeleteSurveyQuestion() {
    // console.log(this.id);
    // const userData = JSON.parse(localStorage.getItem('userData')) ;
    // console.log(this.questionId);    
    this.http.delete<SurveyQuestion>('http://74.208.150.171:3501/api/v1/surveyquestion/'+ this.id+'/'+this.questionId).subscribe(surveyQuestion => {    
    // console.log(surveyQuestion);  
    this.adminService.deleteSurveyQuestions(this.id,this.questionId);
    this.selectedSurveyQuestion = this.surveyQuestions.filter(surveyQuestion => (surveyQuestion.surveyid._id == this.id && surveyQuestion.questionid._id == this.questionId));
    let index = this.surveyQuestions.indexOf(this.selectedSurveyQuestion[0]);                        
    this.surveyQuestions.splice(index,1) ;
  },
  error => {
    // console.log(error);
  });   
  this.modalService.dismissAll();       
   }

}
