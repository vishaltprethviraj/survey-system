import { Department } from './department/department.model';
import { Designation } from './designation/designation.model';
import { Employee } from './employee-details/employee.model';
import { Question } from './question/question.model';
import { Option } from './question/option.model';
import { Survey } from './survey-list/survey.model';
import { AuditLog } from './audit-log/audit-log.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConstantPool } from '@angular/compiler';
import { SurveyQuestion } from './new-survey/survey-question.model';

@Injectable( { providedIn:'root' }) 

export class AdminService {
    
    //department section
    departmentChanged = new Subject<Department[]>();    
    departments: Department[] = [];
    
    setDepartment(department:Department[]){
      this.departments = department;
      this.departmentChanged.next(this.departments.slice());      
    }
    
    addDepartment(department:Department) {
      this.departments.push(department);
      this.departmentChanged.next(this.departments.slice());
    }
    
    selectedDepartment:Department[];
    
    updateDepartment(departmentName:string,id:string) {      
      
      this.selectedDepartment = this.departments.filter(department => 
        department._id == id                    
      ); 
      let index = this.departments.indexOf(this.selectedDepartment[0]);     
      this.departments[index]._id = id;
      this.departments[index].name = departmentName;
      this.departmentChanged.next(this.departments.slice());
    }

    deleteDepartment(id:string) {
      this.selectedDepartment = this.departments.filter(department => 
        department._id == id                    
      ); 
      let index = this.departments.indexOf(this.selectedDepartment[0]);
      this.departments.splice(index,1);
      this.departmentChanged.next(this.departments.slice());
    }
    //designation section

    designationChanged = new Subject<Designation[]>();
    designations: Designation[] = [];

    setDesignation(designation:Designation[]) {
      this.designations = designation;
      this.designationChanged.next(this.designations.slice());
    }        

    addDesignation(newDesignation:Designation) {
      this.designations.push(newDesignation);
      this.designationChanged.next(this.designations.slice());
    }

    selectedDesignation:Designation[];

    updateDesignation(designationName:string,id:string) {
      this.selectedDesignation = this.designations.filter(designation => designation._id == id);
      let index = this.designations.indexOf(this.selectedDesignation[0]);
      this.designations[index].name = designationName;
      this.designations[index]._id = id;
      this.designationChanged.next(this.designations.slice());
    }

    deleteDesignation(id:string) {
      this.selectedDesignation = this.designations.filter(designation => designation._id == id);
      let index = this.designations.indexOf(this.selectedDesignation[0]);            
      this.designations.splice(index,1);
      this.designationChanged.next(this.designations.slice());
    }
    
    //employee section

    employeeChanged = new Subject<Employee[]>();    
    employees: Employee[] = []

    setEmployee(employee:Employee[]) {
      this.employees = employee;
      this.employeeChanged.next(this.employees.slice());
    }
    
    addEmployee(employee:Employee) {
      this.employees.push(employee);      
      this.employeeChanged.next(this.employees.slice());
    }
    
    selectedEmployee:Employee[]
    
    updateEmployee(username:string,name:string,email:string,mobilephone:string,departmentId:string,designationId:string,id:string) {
      this.selectedEmployee = this.employees.filter(employee => employee._id == id);
      let index = this.employees.indexOf(this.selectedEmployee[0]);
      this.employees[index].username = username;
      this.employees[index].name = name;
      this.employees[index].email = email;
      this.employees[index].mobilephone = mobilephone;
      this.employees[index].departmentid[0] = departmentId;
      this.employees[index].designationid[0] = designationId;
      this.employeeChanged.next(this.employees.slice());
    }

    deleteEmployee(id:string) {
      this.selectedEmployee = this.employees.filter(employee => employee._id == id);
      let index = this.employees.indexOf(this.selectedEmployee[0]);                  
      this.employees.splice(index,1);
      this.employeeChanged.next(this.employees.slice());
    }


    //audit log section

    auditLogs: AuditLog[] = [
      new AuditLog(1,[this.employees[0]],'Home','Logged In','24-08-2020 11:50'),
      new AuditLog(2,[this.employees[1]],'New Survey','Create Survey','25-08-2020 11:50'),
    ]

    getAuditLog() {
      return this.auditLogs.slice();
    }
    
    //question section

    questionChanged = new Subject<Question[]>();

    questions:Question[] = [];     
    
    setQuestion(question:Question[]) {
      this.questions = question;
      this.questionChanged.next(this.questions.slice());
    }  
    
    addQuestion(question:Question) {
      this.questions.push(question);
      this.questionChanged.next(this.questions.slice());
    }

    selectedQuestion:Question[];

    updateQuestion(id:string,newQuestion:Question) {
      this.selectedQuestion = this.questions.filter(question => question._id == id);
      let index = this.questions.indexOf(this.selectedQuestion[0]);
      this.questions[index] = newQuestion;      
      this.questionChanged.next(this.questions.slice());
    }

    deleteQuestion(id:string) {
      this.selectedQuestion = this.questions.filter(question => question._id == id);
      let index = this.questions.indexOf(this.selectedQuestion[0]);                        
      this.questions.splice(index,1),
      this.questionChanged.next(this.questions.slice());
    }

    //survey section
    surveyChanged = new Subject<Survey[]>();

    surveys: Survey[] = [];
      // new Survey('Product Survey','This survey is for knowing the user\'s take on various aspects of our product',
      //            'Thank you for your valuable suggestion','25-08-2020','27-08-2020')

    setSurvey(survey:Survey[]) {
      this.surveys = survey;
      this.surveyChanged.next(this.surveys.slice());
    }          

    addSurvey(survey:Survey) {
      this.surveys.push(survey);
      this.surveyChanged.next(this.surveys.slice());
    }
    selectedSurvey: Survey[];
    
    updateSurvey(id:string,newSurvey:Survey) {
      this.selectedSurvey = this.surveys.filter(surveys => surveys._id == id);
      let index = this.surveys.indexOf(this.selectedSurvey[0]); 
      this.surveys[index] = newSurvey;
      this.surveyChanged.next(this.surveys.slice());
    }

    deleteSurvey(id:string) {
      this.selectedSurvey = this.surveys.filter(surveys => surveys._id == id);
      let index = this.surveys.indexOf(this.selectedSurvey[0]);                        
      this.surveys.splice(index,1),
      this.surveyChanged.next(this.surveys.slice());
    }

    //survey question
    surveyQuestionChanged = new Subject<SurveyQuestion[]>();

    surveyQuestions: SurveyQuestion[] = [];

    setSurveyQuestion(newSurveyQuestion:SurveyQuestion[]) {
      this.surveyQuestions = newSurveyQuestion;
      this.surveyQuestionChanged.next(this.surveyQuestions.slice());
    }

}