import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AdminService } from '../admin/admin.service';
import { Department } from '../admin/department/department.model';
import { Designation } from '../admin/designation/designation.model';
import { Employee } from '../admin/employee-details/employee.model';
import { Question } from '../admin/question/question.model';
import { Survey } from '../admin/survey-list/survey.model';
import { SurveyQuestion } from '../admin/new-survey/survey-question.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn:'root' })

export class DataStorageService {
    constructor(private http: HttpClient,private adminService:AdminService) { }
    
    //Departments Section
    departmentList() {        
        return this.http.get<Department[]>(environment.department);        
    }        

    getDepartment(id:string) {            
        return this.http.get<Department>(environment.department +'/'+id);        
    }
  
    //Designation Section

    designationList() {        
        return this.http.get<Designation[]>(environment.designation); 
    }
    getDesignation(id:string) {
        return this.http.get<Designation>(environment.designation + '/' +id);
    }

    //employee section

    employeeList() {
        return this.http.get<Employee[]>(environment.userprofile);
    }

    getEmployee(id:string) {
        return this.http.get<Employee>(environment.userprofile+ '/' +id);
    }

    //question section

    questionList() {
        return this.http.get<Question[]>(environment.question);
    }

    getQuestion(id:string) {
        return this.http.get<Question>(environment.question + '/' +id);
    }

    //survey section
    surveyList() {
        return this.http.get<Survey[]>(environment.survey);
    }

    getSurvey(id:string) {
        return this.http.get<Survey>(environment.survey+ '/' +id);
    }

    //survey question section    
    surveyQuestionList() {
        return this.http.get<SurveyQuestion[]>(environment.surveyQuestion);
    }

    getSurveyQuestions(id:string) {
        return this.http.get<SurveyQuestion[]>(environment.surveyQuestion + '/' + id);
    }    
    
}