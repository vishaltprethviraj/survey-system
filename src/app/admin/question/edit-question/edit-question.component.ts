import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Question } from '../question.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  id: number;
  editMode = false;

  constructor(private route:ActivatedRoute,private router:Router,private adminService:AdminService) { }

  editQuestionForm: FormGroup;

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();          
      }
    );   
  }

  onSubmit() {
    const newQuestion = new Question(this.editQuestionForm.value['question'],this.editQuestionForm.value['options']);
    if(this.editMode) {
      this.adminService.updateQuestion(this.id,newQuestion);
      // console.log(this.editQuestionForm);
      // console.log(newQuestion);
    }
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

    if(this.editMode) {
      const question = this.adminService.getQuestions(this.id)
      questionName = question.question;
      if(question['option']) {
        for (let option of question.option) {
          questionOptions.push(
            new FormGroup({
              'options': new FormControl(option.options,Validators.required)
            })
          )
        }
      }
    }
    
    this.editQuestionForm = new FormGroup({
      'question': new FormControl(questionName,Validators.required),      
      'options': questionOptions
      });
    
  }  

  get controls() { 
    return (<FormArray>this.editQuestionForm.get('options')).controls;
  }


}
