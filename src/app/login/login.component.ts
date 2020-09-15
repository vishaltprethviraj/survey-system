import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {  faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from './user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //required Logo
  faClipboardList = faClipboardList;
  
  //loading check
  isLoading = false;

  //error
  error:string;
  //creating a form
  loginForm: FormGroup;  

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,[Validators.required])
    });
  }
  
  user:User[];

  onSubmit() {
    // console.log(this.loginForm);
    // if(!this.loginForm.valid) {
    //   return ;
    // }
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];
    
    this.isLoading=true;

    this.loginService.login(username,password).subscribe(
      resData => {
        console.log(resData);
        if(resData.role == "admin") {
          this.router.navigate(['/admin/home']);
          this.isLoading = false;                         
        }
        else if(resData.role == "employee") {
          this.router.navigate(['/employee/home']);
          this.isLoading = false;
        }  
        else if(resData.message == "wrong password") {
          this.isLoading =false;
          console.log(resData.message);
          this.error = 'The password entered is incorrect';
          this.user = null;
        }     
        else if(resData.messgae == "user not found") {
          this.isLoading =false;
          console.log(resData.messgae);
          this.user = null;
          this.error = "This user does not exist";
        }     
        this.loginForm.reset();   
      }   
      
    );
    
  }

  onHandleError() {
    this.error = null;
  }
  

}
