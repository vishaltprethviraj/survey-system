import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee.component';
import { HomeComponent } from './home/home.component';
import { ListSurveyComponent } from './list-survey/list-survey.component';
import { SurveyQuestionComponent } from './list-survey/survey-question/survey-question.component';
import { QuestionOptionComponent } from './list-survey/survey-question/question-option/question-option.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
    { path: 'employee' , 
      component : EmployeeComponent, 
      canActivate : [AuthGuard],
      children: [        
         { path: '', component: HomeComponent },
         { path: 'home', component: HomeComponent},
         { path: 'list-survey', children:[
            { path: '' , component:ListSurveyComponent},
            { path: ':surveyId/survey-question',  children:[
                { path: '', component:SurveyQuestionComponent},                
            ]}
         ]
            },
            { path: 'ok-page' , component: QuestionOptionComponent }
        
    ]
},
    
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {

}