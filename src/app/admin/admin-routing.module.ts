import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { QuestionComponent } from './question/question.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ReportComponent } from './report/report.component';
import { AdminComponent } from './admin.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { AddDesignationComponent } from './designation/add-designation/add-designation.component';
import { EditDesignationComponent } from './designation/edit-designation/edit-designation.component';
import { AddQuestionComponent } from './question/add-question/add-question.component';
import { EditQuestionComponent } from './question/edit-question/edit-question.component';
import { EditEmployeeComponent } from './employee-details/edit-employee/edit-employee.component';
import { SurveyDetailComponent } from './survey-list/survey-detail/survey-detail.component';
import { AddSurveyQuestionComponent } from './new-survey/add-survey-question/add-survey-question.component';

const routes: Routes = [
    { path: 'admin' , component : AdminComponent, 
    
    children: [        
         { path: '', component: HomeComponent },
         { path: 'home', component: HomeComponent},
         { path: 'audit-log', component: AuditLogComponent },
         { path: 'employee-details', children: [
             { path: '', component: EmployeeDetailsComponent , pathMatch:'full'},
             { path: ':id/edit', component:EditEmployeeComponent}
            ] },
         { path: 'department', component: DepartmentComponent, children:[
             { path: 'add', component: AddDepartmentComponent },                          
             { path: ':id/edit', component: EditDepartmentComponent}
         ] },
         { path: 'designation', component: DesignationComponent, children: [
             { path: 'add', component: AddDesignationComponent},
             { path: ':id/edit',component:EditDesignationComponent }
         ] },
         { path: 'question',  children: [
            
                { path: '', component: QuestionComponent, pathMatch: 'full' },
                { path: 'add', component: AddQuestionComponent },
                { path: ':id/edit', component: EditQuestionComponent }
              
         ] },
         { path: 'survey-list', children:[
            { path:'' ,component: SurveyListComponent },
            { path:':id/detail',component:SurveyDetailComponent}
         ] 
          },
         { path: 'new-survey', children:[
            { path:'' ,component: NewSurveyComponent },
            { path:'add-survey-question',component:AddSurveyQuestionComponent}
         ] },
         { path: 'new-employee', component: NewEmployeeComponent},
         { path: 'report', component: ReportComponent }
    ]
},
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}