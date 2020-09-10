import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './login/login.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent                  
  ],
  imports: [
    BrowserModule,     
    AppRoutingModule,
    AdminModule,
    LoginModule,
    EmployeeModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
