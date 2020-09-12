import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Question } from './question.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  id:string;

  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  
  questions: Question[] = this.adminService.questions;  

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute,private dataStorageService: DataStorageService,private modalService:NgbModal,private http:HttpClient) { }

  ngOnInit(): void {
    this.dataStorageService.questionList().subscribe(questions =>{
      this.adminService.setQuestion(questions);
      // console.log(questions);
    });    
    this.adminService.questionChanged
    .subscribe(
      (question: Question[]) => {
        this.questions = question;
      }
    ); 
    // console.log(this.questions);
  }

  onAddQuestion() {
    this.router.navigate(['add'],{ relativeTo: this.route });    
  }

  openModal(targetModal, question) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   this.id = question._id; 
   console.log(this.id);   
   }

   onDeleteDepartment() {
    console.log(this.id);    
    this.http.delete('http://74.208.150.171:3501/api/v1/question/'+ this.id).subscribe(res => {
    this.adminService.deleteQuestion(this.id);   
    console.log(res) 
  },
  error => {
    console.log(error);
  }); 
  this.modalService.dismissAll();       
   }


}
