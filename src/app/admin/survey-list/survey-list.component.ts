import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Survey } from './survey.model';
import { AdminService } from '../admin.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from '@angular/common/http';
import { faPencilAlt,faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  id: string;
  surveys:Survey[] = this.adminService.surveys;
  
  //required Icons
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;  
  

  constructor(private adminService:AdminService,private dataStorageService:DataStorageService,public datePipe:DatePipe,private modalService:NgbModal,private http:HttpClient) { }
    

  ngOnInit(): void {
    this.dataStorageService.surveyList().subscribe(surveys => {
      this.adminService.setSurvey(surveys);      
      console.log(surveys);
      for(var i=0;i<surveys.length;i++) {
        if((new Date()) > surveys[i].end_date) {
          this.adminService.activeSurveys++;
        }
      }

    });

    this.adminService.surveyChanged
      .subscribe(
        (surveys: Survey[]) => {
          this.surveys = surveys;          
        }
      );      
    // console.log(this.surveys);
  }

  openModal(targetModal, survey) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   this.id = survey._id; 
   console.log(this.id);   
   }

   onDeleteSurvey() {
    console.log(this.id);    
    this.http.delete('http://74.208.150.171:3501/api/v1/survey/'+ this.id).subscribe(res => {
    this.adminService.deleteSurvey(this.id); 
    console.log(res);
  },
  error => {
    console.log(error);
  }); 
  this.http.delete('http://74.208.150.171:3501/api/v1/surveyquestion/'+ this.id) .subscribe(res=> {
    console.log(res);
  });

  this.modalService.dismissAll();       
   }

}
