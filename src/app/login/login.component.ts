import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {  faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //required Logo
  faClipboardList = faClipboardList;

  //creating a form
  loginForm: FormGroup;  

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }
  
  onSubmit() {
    // console.log(this.loginForm);
    if(!this.loginForm.valid) {
      return ;
    }
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];

    this.loginService.login(username,password).subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/admin/home']);
      },
      errorMessage => {
        console.log(errorMessage);
        
      }
    );
    this.loginForm.reset();
  }
  

}
