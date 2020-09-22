import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Question } from '../question.model';
import { AdminService } from '../../admin.service';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  id: string;
  editMode = false;

  constructor(private route:ActivatedRoute,private router:Router,private adminService:AdminService,private http:HttpClient,private dataStorageService:DataStorageService) { }

  editQuestionForm: FormGroup;

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();          
      }
    );   
  }
  options;
  optionArray:[];

  onSubmit() {
    const description = this.editQuestionForm.value['question'];
    this.options = this.editQuestionForm.value['options'];
    this.optionArray = this.options.map(x => x.options);
    // console.log(this.optionArray);
    this.http.patch<Question>(environment.question + '/' + this.id,
      {
        description: description,
        options: this.optionArray
      }).subscribe(editedQuestion => {
        // console.log(editedQuestion);
        this.adminService.updateQuestion(this.id,editedQuestion);                             
      }, error => {
        // console.log(error)
      });
    this.router.navigate(['/admin/question']);

  }
  
  onCancel() {
    this.router.navigate(['/admin/question']);
  }
  
  onAddOption() {
    (<FormArray>this.editQuestionForm.get('options')).push(
      new FormGroup({
        'options': new FormControl(null,Validators.required)
      })
    );
  }

  onDeleteOption(index:number) {
    (<FormArray>this.editQuestionForm.get('options')).removeAt(index);
  }

  private initForm() {
    let questionName = '';
    let questionOptions = new FormArray([]);

    this.editQuestionForm = new FormGroup({
      'question': new FormControl(questionName, Validators.required),
      'options': questionOptions
    });

    this.dataStorageService.getQuestion(this.id).subscribe(question => {
      questionName = question.description;
      if (question['options']) {
        for (let option of question.options) {
          questionOptions.push(
            new FormGroup({
              'options': new FormControl(option, Validators.required)
            })
          )
        }
      }

      this.editQuestionForm = new FormGroup({
        'question': new FormControl(question.description),
        'options': questionOptions
      });
    },
      errorRes => {
        // console.log(errorRes);
      });
             
  }  

  get controls() { 
    return (<FormArray>this.editQuestionForm.get('options')).controls;
  }
}
