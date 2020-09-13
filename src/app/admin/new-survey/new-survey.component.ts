import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Survey } from '../survey-list/survey.model';
import { DatePipe } from '@angular/common';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private adminService:AdminService,private http:HttpClient,private datePipe:DatePipe) { }

  newSurveyForm: FormGroup;  
  id: string;
  minDate:string; 
   
  
  ngOnInit(): void {
    this.newSurveyForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'description': new FormControl(null,Validators.required),
      'thankYouMessage': new FormControl(null,Validators.required),
      'startDate': new FormControl(null),
      'endDate': new FormControl(null)
    });    
    this.minDate = this.datePipe.transform(new Date(),'yyyy-MM-dd'); 
  }

  onChange() {
    let newMinDate = this.newSurveyForm.value['startDate'];    
    let newMinimumDate = new Date(newMinDate);
    newMinimumDate.setDate(newMinimumDate.getDate()+1);
    this.minDate = this.datePipe.transform(newMinimumDate,'yyyy-MM-dd');
    console.log(this.minDate);
  }
  onSubmit() {
    const name = this.newSurveyForm.value['name'];
    const description = this.newSurveyForm.value['description'];
    const thankYouMessage = this.newSurveyForm.value['thankYouMessage'];
    const startDate = this.newSurveyForm.value['startDate'];
    const endDate = this.newSurveyForm.value['endDate'];                         
    // this.adminService.addSurvey(newSurvey);
    this.http.post<Survey>('http://74.208.150.171:3501/api/v1/survey',
                          {
                            name: name,
                            description: description,
                            thank_you_message: thankYouMessage,
                            start_date: startDate,
                            end_date: endDate
                          }).subscribe( newSurvey => {
                            console.log(newSurvey);                            
                            // console.log(newSurvey._id);                            
                            this.router.navigate([newSurvey._id,'add-survey-question'],{ relativeTo: this.route })
                          });
    // console.log(this.newSurveyForm);    
    
  }
  

}
