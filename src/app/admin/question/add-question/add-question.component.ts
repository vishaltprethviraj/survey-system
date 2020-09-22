import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, Form } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router,private route:ActivatedRoute,private http:HttpClient) { }
  
  addQuestionForm: FormGroup;

  ngOnInit(): void {
    this.onInit();
  }

  private onInit() {
    let question = '';
    let questionOptions = new FormArray([],Validators.required);
        
    this.addQuestionForm = new FormGroup({
      'question': new FormControl(question,Validators.required),      
      'options': questionOptions           
    });
    
    (<FormArray>this.addQuestionForm.get('options')).push(
      new FormGroup({
        'options': new FormControl(null,Validators.required)
      })
    );
    (<FormArray>this.addQuestionForm.get('options')).push(
      new FormGroup({
        'options': new FormControl(null,Validators.required)
      })
    );
  }  
  
  options;
  optionArray:[];

  onSubmit() {    
    const description = this.addQuestionForm.value['question'];
    this.options  = this.addQuestionForm.value['options'];
    this.optionArray = this.options.map(x => x.options);    
    // console.log(this.optionArray);    
    this.http.post<Question>(environment.question,
          { 
            description:description,
            options:this.optionArray
          }).subscribe(newQuestion=>{
            // console.log(newQuestion);
      this.adminService.addQuestion(newQuestion);
    });  
    // console.log(this.addQuestionForm);
    this.onCancel();
  }
  
  onCancel() {
    this.options  = this.addQuestionForm.value['options'];  
    
    // console.log(this.options);
    this.router.navigate(['/admin/question']);
  }

  onAddOption() {
    (<FormArray>this.addQuestionForm.get('options')).push(
      new FormGroup({
        'options': new FormControl(null,Validators.required)
      })
    );
  }

  onDeleteOption(index:number) {
    (<FormArray>this.addQuestionForm.get('options')).removeAt(index);
  }

  get controls() { 
    return (<FormArray>this.addQuestionForm.get('options')).controls;
  }
}
