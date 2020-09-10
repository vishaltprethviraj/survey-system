import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { QuestionComponent } from './question/question.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ReportComponent } from './report/report.component';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { AddDesignationComponent } from './designation/add-designation/add-designation.component';
import { EditDesignationComponent } from './designation/edit-designation/edit-designation.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { EditQuestionComponent } from './question/edit-question/edit-question.component';
import { EditEmployeeComponent } from './employee-details/edit-employee/edit-employee.component';
import { SurveyDetailComponent } from './survey-list/survey-detail/survey-detail.component';
import { AddSurveyQuestionComponent } from './new-survey/add-survey-question/add-survey-question.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    AuditLogComponent,
    EmployeeDetailsComponent,
    DepartmentComponent,
    DesignationComponent,
    SurveyListComponent,
    QuestionComponent,
    NewEmployeeComponent,
    ReportComponent,
    NewSurveyComponent,
    SidebarComponent,
    TopbarComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    AddDesignationComponent,
    EditDesignationComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    EditEmployeeComponent,
    SurveyDetailComponent,
    AddSurveyQuestionComponent    
  ],
  imports: [
    RouterModule,    
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AdminComponent,
    HomeComponent,
    AuditLogComponent,
    EmployeeDetailsComponent,
    DepartmentComponent,
    DesignationComponent,
    SurveyListComponent,
    QuestionComponent,
    NewEmployeeComponent,
    ReportComponent,
    NewSurveyComponent,
    SidebarComponent,
    TopbarComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    EditEmployeeComponent,
    SurveyDetailComponent   
  ],
  providers:[DatePipe]
})
export class AdminModule {

}