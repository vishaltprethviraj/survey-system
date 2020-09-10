import { Component, OnInit } from '@angular/core';
import { faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Question } from './question.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  id:number;
  //required Icons
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  
  questions: Question[];  

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.adminService.questionChanged
    .subscribe(
      (question: Question[]) => {
        this.questions = question;
      }
    );

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];          
      }
    );

    this.questions = this.adminService.getQuestion();
    console.log(this.questions);
  }

  onAddQuestion() {
    this.router.navigate(['add'],{ relativeTo: this.route });    
  }

  onDeleteQuestion(i) {
    this.adminService.deleteQuestion(i);    
  }

}
