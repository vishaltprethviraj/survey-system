import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AdminService } from '../../admin.service';
import { Survey } from '../survey.model';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {

  editSurveyForm: FormGroup;
  id: string;
  minDate:string; 

  constructor(private http: HttpClient, private dataStorageService: DataStorageService, private route: ActivatedRoute, private router: Router,private adminService:AdminService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.editSurveyForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'thankYouMessage': new FormControl(null, Validators.required),
      'startDate': new FormControl(null),
      'endDate': new FormControl(null)
    });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.initForm();
        }
      );
      this.minDate = this.datePipe.transform(new Date(),'yyyy-MM-dd'); 
  }
  
  onChange() {
    let newMinDate = this.editSurveyForm.value['startDate'];    
    let newMinimumDate = new Date(newMinDate);
    newMinimumDate.setDate(newMinimumDate.getDate()+1);
    this.minDate = this.datePipe.transform(newMinimumDate,'yyyy-MM-dd');
    console.log(this.minDate);
  }
  onSubmit() {
    const name = this.editSurveyForm.value['name'];
    const description = this.editSurveyForm.value['description'];
    const thankYouMessage = this.editSurveyForm.value['thankYouMessage'];
    const startDate = this.editSurveyForm.value['startDate'];
    const endDate = this.editSurveyForm.value['endDate'];
    // this.adminService.addSurvey(newSurvey);
    this.http.patch<Survey>('http://74.208.150.171:3501/api/v1/survey/'+this.id,
      {
        name: name,
        description: description,
        thank_you_message: thankYouMessage,
        start_date: startDate,
        end_date: endDate
      }).subscribe(newSurvey => {
        console.log(newSurvey);  
        this.adminService.updateSurvey(newSurvey._id,newSurvey);                                          
      });       
      this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/admin/survey-list']);
  }

  private initForm() {

    this.dataStorageService.getSurvey(this.id).subscribe(survey => {
      this.editSurveyForm = new FormGroup({
        'name': new FormControl(survey.name, Validators.required),
        'description': new FormControl(survey.description, Validators.required),
        'thankYouMessage': new FormControl(survey.thank_you_message, Validators.required),
        'startDate': new FormControl(this.datePipe.transform(survey.start_date,'yyyy-MM-dd')),
        'endDate': new FormControl(this.datePipe.transform(survey.end_date,'yyyy-MM-dd'))
      });
    },
      errorRes => {
        console.log(errorRes);
      });

  }
}
