import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './login/login.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthInterceptorService } from './login/auth-interceptor.service';

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
    HttpClientModule,
    NgbModule
   
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
