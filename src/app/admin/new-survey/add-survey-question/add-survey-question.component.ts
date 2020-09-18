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
  selectedQuestion: Question[];
  options: [];  
  selectedQuestionId:string;

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
    

  getOption(id:string) {    
    this.selectedQuestion = this.questions.filter(question => question._id == id);
    let index = this.questions.indexOf(this.selectedQuestion[0]);
    this.options = this.questions[index].options;    
  }

  selectedSurveyQuestion:Question[];

  onAddQuestion() {   
 
    const questionId = this.addSurveyQuestionForm.value['surveyQuestion'];        
    this.http.post<SurveyQuestion>('http://74.208.150.171:3501/api/v1/surveyquestion',
                                  {
                                    surveyid: this.id,
                                    questionid: questionId
                                  }).subscribe(newSurveyQuestion => {                                                                        
                                    this.adminService.addSurveyQuestion(newSurveyQuestion);  
                                    console.log(newSurveyQuestion);                                    
                                    this.selectedSurveyQuestion = this.questions.filter(questions => (questions._id == questionId));
                                    console.log(this.selectedSurveyQuestion);
                                    let index = this.questions.indexOf(this.selectedSurveyQuestion[0]);
                                    console.log(index);
                                    if(index == 0) {
                                      console.log(this.questions.slice(index+1));
                                      this.questions = this.questions.slice(index+1);
                                      this.addSurveyQuestionForm = new FormGroup({
                                        'surveyQuestion': new FormControl(this.questions[0]._id)
                                      });
                                    }                                    
                                    else if(index == this.questions.length-1) {
                                      this.questions = this.questions.slice(0,index)
                                      this.addSurveyQuestionForm = new FormGroup({
                                        'surveyQuestion': new FormControl(this.questions[0]._id)
                                      });
                                    }
                                    else {
                                      console.log(this.questions.slice(0,index));
                                      this.questions = (this.questions.slice(0,index)).concat(this.questions.slice(index+1,this.questions.length));                                    
                                      this.addSurveyQuestionForm = new FormGroup({
                                        'surveyQuestion': new FormControl(this.questions[0]._id)
                                      });
                                    }                                    
                                    this.isAdded = true;                                                                                      
                                  });

    this.dataStorageService.getSurveyQuestions(this.id).subscribe(surveyQuestions => {
      this.surveyQuestions = surveyQuestions;      
    });    
                                
  }
     
  // onDeleteSurveyQuestion(questionId:string) {        
       
  //   this.http.delete<SurveyQuestion>('http://74.208.150.171:3501/api/v1/surveyquestion/'+ this.id+'/'+questionId).subscribe(surveyQuestion => {    
  //   console.log(surveyQuestion);  
  //   this.adminService.deleteSurveyQuestions(this.id,questionId);          
  // },
  // error => {
    
  // });   
  // this.modalService.dismissAll();       
  //  }
   
}
