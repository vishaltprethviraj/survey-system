import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AdminService } from '../admin/admin.service';
import { Department } from '../admin/department/department.model';
import { Designation } from '../admin/designation/designation.model';
import { Employee } from '../admin/employee-details/employee.model';
import { Question } from '../admin/question/question.model';
import { Survey } from '../admin/survey-list/survey.model';
import { SurveyQuestion } from '../admin/new-survey/survey-question.model';

@Injectable({ providedIn:'root' })

export class DataStorageService {
    constructor(private http: HttpClient,private adminService:AdminService) { }
    
    //Departments Section
    departmentList() {        
        return this.http.get<Department[]>('http://74.208.150.171:3501/api/v1/department');        
    }        

    getDepartment(id:string) {            
        return this.http.get<Department>('http://74.208.150.171:3501/api/v1/department/'+id);        
    }
  
    //Designation Section

    designationList() {        
        return this.http.get<Department[]>('http://74.208.150.171:3501/api/v1/designation'); 
    }
    getDesignation(id:string) {
        return this.http.get<Designation>('http://74.208.150.171:3501/api/v1/designation/'+id);
    }

    //employee section

    employeeList() {
        return this.http.get<Employee[]>('http://74.208.150.171:3501/api/v1/userprofile');
    }

    getEmployee(id:string) {
        return this.http.get<Employee>('http://74.208.150.171:3501/api/v1/userprofile/'+id);
    }

    //question section

    questionList() {
        return this.http.get<Question[]>('http://74.208.150.171:3501/api/v1/question');
    }

    getQuestion(id:string) {
        return this.http.get<Question>('http://74.208.150.171:3501/api/v1/question/'+id);
    }

    //survey section
    surveyList() {
        return this.http.get<Survey[]>('http://74.208.150.171:3501/api/v1/survey');
    }

    getSurvey(id:string) {
        return this.http.get<Survey>('http://74.208.150.171:3501/api/v1/survey/'+id);
    }

    //survey question section    
    surveyQuestionList() {
        return this.http.get<SurveyQuestion[]>('http://74.208.150.171:3501/api/v1/surveyquestion');
    }

    getSurveyQuestions(id:string) {
        return this.http.get<SurveyQuestion[]>('http://74.208.150.171:3501/api/v1/surveyquestion/'+id);
    }    
    
}