import { Component, OnInit } from '@angular/core';
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

   onDeleteDepartment() {
    console.log(this.id);    
    this.http.delete('http://74.208.150.171:3501/api/v1/survey/'+ this.id).subscribe(res => {
    this.adminService.deleteSurvey(this.id);    
  },
  error => {
    console.log(error);
  }); 
  this.modalService.dismissAll();       
   }

}
