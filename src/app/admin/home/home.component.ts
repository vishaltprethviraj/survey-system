import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  isAuthenticated = true;
  private userSub: Subscription;
  activeSurveys:number = 0;
  currentDate = new Date();

  constructor(private loginService:LoginService,private dataStorageService:DataStorageService,private adminService:AdminService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    //department Initialization
    this.dataStorageService.departmentList().subscribe(departments => {            
      localStorage.setItem('departmentData',JSON.stringify(departments));
      this.adminService.setDepartment(departments);               
    },              
      errorRes => {
        // console.log(errorRes);
      }      
     );   
    
    //designation Initialization
    this.dataStorageService.designationList().subscribe(designation => {
      localStorage.setItem('designationData',JSON.stringify(designation));
      this.adminService.setDesignation(designation);
    });

    //question intitialization
    this.dataStorageService.questionList().subscribe(questions =>{
      this.adminService.setQuestion(questions);
      // console.log(questions);
    });       

    //employee initialization
    this.dataStorageService.employeeList().subscribe(employees => {
      this.adminService.setEmployee(employees);
      // console.log(employees);
      // console.log(this.adminService.employees);
    });
    
    this.userSub = this.loginService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;        //!!user can also be used           
    });
    // console.log(this.isAuthenticated);

    //survey initialization
    this.dataStorageService.surveyList().subscribe(surveys => {
      this.adminService.setSurvey(surveys);      
      // console.log(surveys);
      // console.log(this.currentDate);
      // console.log(surveys[0].end_date);
      for(var i=0;i<surveys.length;i++) {
        if(this.datePipe.transform(this.currentDate,'yyyy-MM-dd') <= this.datePipe.transform(surveys[i].end_date,'yyyy-MM-dd')) {
          this.activeSurveys  = this.activeSurveys + 1;          
        }
      }
    });    

    
  }
  
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
