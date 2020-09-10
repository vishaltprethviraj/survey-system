import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';
import { Survey } from '../survey-list/survey.model';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private adminService:AdminService) { }

  newSurveyForm: FormGroup;  

  ngOnInit(): void {
    this.newSurveyForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'description': new FormControl(null,Validators.required),
      'thankYouMessage': new FormControl(null,Validators.required),
      'startDate': new FormControl(null),
      'endDate': new FormControl(null)
    });
    
  }

  onSubmit() {
    const newSurvey = new Survey(this.newSurveyForm.value['name'],
                                 this.newSurveyForm.value['description'],
                                 this.newSurveyForm.value['thankYouMessage'],
                                 this.newSurveyForm.value['startDate'],
                                 this.newSurveyForm.value['endDate']
                      )    
    this.adminService.addSurvey(newSurvey);
    console.log(this.newSurveyForm);
    this.router.navigate(['add-survey-question'],{ relativeTo: this.route })
  }
  

}
