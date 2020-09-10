import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  username:string;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
        
  }

}
