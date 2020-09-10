import { Component, OnInit } from '@angular/core';

import { faClipboardList, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/login/login.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

   // Required Icons   
   username:string;
   faPowerOff = faPowerOff;
   faClipboardList = faClipboardList;  
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
   const userData = JSON.parse(localStorage.getItem('userData'));
   this.username = userData.username; 
  }

}
